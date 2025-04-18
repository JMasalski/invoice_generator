import {Invoice} from "../models/invoice.model.js";
import {Client} from "../models/client.model.js";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import '../lib/DejaVuSans-normal.js'
import amountToWords from "../lib/amountToWord.js";

const generateInvoiceNumber = async (userId) => {
    try {
        const currentYear = new Date().getFullYear();
        const currentMont = new Date().getMonth() + 1;
        let lastNumber = 0;

        // Próbujemy znaleźć fakturę z najwyższym numerem w bieżącym roku
        const lastInvoice = await Invoice.findOne({userId})
            .sort({createdAt: -1});  // Poszukujemy ostatniej faktury użytkownika

        if (lastInvoice) {
            lastNumber = parseInt(lastInvoice.invoiceNumber.split('/')[1]);
        }

        // Rozpoczynamy generowanie numeru faktury, począwszy od 001
        let newNumber = lastNumber + 1;
        let invoiceNumber = `${String(newNumber).padStart(3, '0')}/${currentMont}-${currentYear}`;

        // Sprawdzamy, czy numer już istnieje w bazie danych
        let existingInvoice = await Invoice.findOne({invoiceNumber});
        while (existingInvoice) {
            newNumber++;
            invoiceNumber = `${String(newNumber).padStart(3, '0')}/${currentMont}-${currentYear}`;
            existingInvoice = await Invoice.findOne({invoiceNumber});
        }

        return invoiceNumber;
    } catch (error) {
        console.error('Error generating invoice number:', error);
        return `${new Date().getFullYear()}/001`;  // Domyślny numer
    }
};


export const createInvoice = async (req, res) => {
    try {
        const {client, products, dueDate, paymentType} = req.body;
        const userId = req.user.id;

        const currentClient = await Client.findById(client);
        if (!currentClient) return res.status(404).json({message: "Nie znaleziono klienta"});


        let totalNetAmount = 0;
        let totalTaxAmount = 0;
        let totalGrossAmount = 0;

        const selectedProducts = products.map((item) => {
            const netPrice = parseFloat((item.price * item.quantity).toFixed(2));
            const taxAmount = parseFloat((netPrice * (item.taxRate / 100)).toFixed(2));
            const grossPrice = parseFloat((netPrice + taxAmount).toFixed(2));

            totalNetAmount += netPrice;
            totalTaxAmount += taxAmount;
            totalGrossAmount += grossPrice;
            return {
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                taxRate: item.taxRate,
                unit: item.unit,
                netPrice,
                taxAmount,
                grossPrice
            };
        });
        totalNetAmount = parseFloat(totalNetAmount.toFixed(2));
        totalTaxAmount = parseFloat(totalTaxAmount.toFixed(2));
        totalGrossAmount = parseFloat(totalGrossAmount.toFixed(2));

        const invoiceNumber = await generateInvoiceNumber(userId);


        const invoice = new Invoice({
            user: userId,
            client,
            products: selectedProducts,
            totalNetAmount,
            totalTaxAmount,
            totalGrossAmount,
            invoiceNumber,
            issueDate: new Date(),
            dueDate: new Date(dueDate),
            paymentType
        });


        await invoice.save();

        return res.status(201).json({success: true, invoice});

    } catch (error) {
        console.error("Error in create invoice route:", error);
        return res.status(500).json({message: "Internal server error"});
    }
};


export const getAllInvoices = async (req, res) => {
    const user = req.user.id;
    try {
        const invoices = await Invoice.find({user}).populate("client");
        return res.status(200).json({success: true, invoices});
    } catch (e) {
        console.log("Error in get all invoices route", e);
        res.status(500).json({message: "Internal server error"});
    }
}



export const invoicePDF = async (req, res) => {
    const {id} = req.params;

    const invoice = await Invoice.findById(id)
    if (!invoice) return res.status(404).json({message: "Invoice not found"});

    const user = req.user;
    const client = await Client.findById(invoice.client);

    if (!client) return res.status(404).json({message: "Invoice not found"});

    //columns
    const columnsProduct = ["L.p.", "Nazwa towaru/usługi", "Ilość", "Jm", "Cena netto", "VAT", "Wartość netto", "Wartość brutto"];
    const productsToTable = invoice.products.map((item, index) => [
        index + 1,
        item.productName,
        item.quantity,
        item.unit,
        `${item.price.toFixed(2)} PLN`,
        `${item.taxRate} %`,
        `${item.netPrice.toFixed(2)} PLN`,
        `${item.grossPrice.toFixed(2)} PLN`
    ])
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    })


    pdf.setFont('DejaVuSans');
    // pdf.addFont("")
    //date section
    pdf.setFontSize(12);
    pdf.text("Data wystawienia:", 125, 20)
    pdf.text(new Date(invoice.createdAt).toISOString().split("T")[0], 165, 20);

    pdf.text("Termin płatności:", 125, 27)
    pdf.text(new Date(invoice.dueDate).toISOString().split("T")[0], 165, 27);

    pdf.setFontSize(15)
    pdf.text("Faktura nr:", 10, 40)
    pdf.text(invoice.invoiceNumber, 40, 40)

    //seller section
    pdf.setFontSize(12)
    pdf.text("Sprzedawca", 10, 50)
    pdf.line(10, 52, 100, 52)
    pdf.setFontSize(10)
    pdf.text(user.companyName, 10, 56)
    pdf.text(user.address.street, 10, 61)
    pdf.text(user.address.postalCode, 10, 66)
    pdf.text(user.address.city, 25, 66)
    pdf.text("NIP:", 10, 71)
    pdf.text(user.taxId, 17, 71)
    pdf.text("Email:", 10, 76)
    pdf.text(user.email, 21, 76)
    pdf.text("Numer konta:", 10, 81)
    pdf.text(user.bankAccount, 35, 81)

    //client section
    pdf.setFontSize(12)
    pdf.text("Nabywca", 105, 50)
    pdf.line(105, 52, 200, 52)
    pdf.setFontSize(10)
    pdf.text(client.companyName, 105, 56)
    pdf.text("NIP:", 105, 61)
    pdf.text(client.taxId, 112, 61)
    pdf.text(client.address.street, 105, 66)
    pdf.text(client.address.postalCode, 105, 71)
    pdf.text(client.address.city, 120, 71)

    let finalY;
    autoTable(pdf, {
        startY: 90,
        head: [columnsProduct],
        body: productsToTable,
        theme: "grid",
        styles: {
            font: "DejaVuSans",
            fontSize: 10,
            fontStyle: 'normal'
        },
        headStyles: {
            font: "DejaVuSans",
            fontStyle: 'normal',
        },
        bodyStyles: {
            font: "DejaVuSans",
            fontStyle: 'normal'
        },
        columnStyles: {
            font: "DejaVuSans"
        },
        didDrawPage: function (data) {
            finalY = data.cursor.y;
        }
    });


    const spacingBetweenTables = 5; // odstęp 10mm
    const startYForSummaryTable = finalY + spacingBetweenTables;


    const columnsSummary = ["", "Wartość netto", "Kwota VAT", "Wartość brutto"];

    const summaryData = [
        [
            'Razem',
            `${invoice.totalNetAmount.toFixed(2)} PLN`,
            `${invoice.totalTaxAmount.toFixed(2)} PLN`,
            `${invoice.totalGrossAmount.toFixed(2)} PLN`
        ]
    ];

// Druga tabela - podsumowanie
    autoTable(pdf, {
        startY: startYForSummaryTable,
        head: [columnsSummary],
        body: summaryData,
        theme: "grid",
        styles: {
            font: "DejaVuSans",
            fontSize: 10,
            fontStyle: 'normal'
        },
        headStyles: {
            font: "DejaVuSans",
            fontStyle: 'normal',
        },
        bodyStyles: {
            font: "DejaVuSans",
            fontStyle: 'normal'
        },
        columnStyles: {
            font: "DejaVuSans"
        },
        tableWidth: 120,
        margin: {left: 76}
    });


    pdf.text(`Sposób zapłaty: ${(invoice.paymentType ? invoice.paymentType.replace(/_/g, " ") : "Brak danych")}`, 77, startYForSummaryTable + 20)

    pdf.setFontSize(13)
    const textX = 120;
    const textY = startYForSummaryTable + 40;
    pdf.setFillColor(200, 200, 200);
    pdf.rect(10, textY - 7, 190, 13, "F");
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Razem do zapłaty ${invoice.totalGrossAmount}`, textX, textY);

    pdf.setFontSize(10)
    pdf.text(`Kwota słownie: ${amountToWords(invoice.totalGrossAmount)}`, 100, textY + 20, {margin:{left:20}})



    pdf.setFontSize(7)
    pdf.text("Osoba upoważniona do odbioru", 30, 250);
    pdf.line(20, 245, 80, 245); // Linia pod podpis


    pdf.text("Osoba upoważniona do wystawienia", 130, 250);
    pdf.line(120, 245, 180, 245); // Linia pod podpis

    //generate pdf as buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.send(pdfBuffer);
}