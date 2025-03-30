import {Invoice} from "../models/invoice.model.js";
import {Client} from "../models/client.model.js";
import {jsPDF} from "jspdf";


const generateInvoiceNumber = async (userId) => {
    try {
        const currentYear = new Date().getFullYear();
        let lastNumber = 0;

        // Próbujemy znaleźć fakturę z najwyższym numerem w bieżącym roku
        const lastInvoice = await Invoice.findOne({userId})
            .sort({createdAt: -1});  // Poszukujemy ostatniej faktury użytkownika

        if (lastInvoice) {
            lastNumber = parseInt(lastInvoice.invoiceNumber.split('/')[1]);
        }

        // Rozpoczynamy generowanie numeru faktury, począwszy od 001
        let newNumber = lastNumber + 1;
        let invoiceNumber = `${currentYear}/${String(newNumber).padStart(3, '0')}`;

        // Sprawdzamy, czy numer już istnieje w bazie danych
        let existingInvoice = await Invoice.findOne({invoiceNumber});
        while (existingInvoice) {
            newNumber++;
            invoiceNumber = `${currentYear}/${String(newNumber).padStart(3, '0')}`;
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

        // Pobranie danych klienta
        const currentClient = await Client.findById(client);
        if (!currentClient) return res.status(404).json({message: "Client not found"});

        // Przetwarzanie produktów i obliczanie sum
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

        // Utworzenie nowej faktury
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

        // Zapisanie faktury do bazy danych
        await invoice.save();

        // Odpowiedź z sukcesem
        return res.status(201).json({success: true, invoice});

    } catch (error) {
        console.error("Error in create invoice route:", error);
        return res.status(500).json({message: "Internal server error"});
    }
};


export const getAllInvoices = async (req, res) => {
    const userId = req.user.id;
    try {
        const invoices = await Invoice.find({userId});
        return res.status(200).json({success: true, invoices});
    } catch (e) {
        console.log("Error in get all invoices route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getInvoice = async (req, res) => {
    const userId = req.user.id;
    const InvId = req.param.id
    try {
        const invoices = await Invoice.findOne({userId, InvId});
        return res.status(200).json({success: true, invoices});
    } catch (e) {
        console.log("Error in get all invoices route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const invoicePDF = async (req,res) =>{
    console.log("Received request with params:", req.params);
    const {id} = req.params;
    const invoice = await Invoice.findById(id)
    if(!invoice) return res.status(404).json({message: "Invoice not found"});
    const user = req.user;
    const client = await Client.findById(invoice.client);

    if (!client) return res.status(404).json({message: "Invoice not found"});
    // return res.status(200).json({success: true, invoice, user, client});

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format:"a4",
    })

    //set font
    pdf.setFont("helvetica");
    //set header
    pdf.setFontSize(24);
    pdf.text(invoice.invoiceNumber, 20,20)

    //generate pdf as buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.send(pdfBuffer);
}