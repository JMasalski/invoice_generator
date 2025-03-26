import {Invoice} from "../models/invoice.model.js";

import {Client} from "../models/client.model.js";

const generateInvoiceNumber = async (userId) => {
    try {
        const currentYear = new Date().getFullYear();
        let lastNumber = 0;

        // Próbujemy znaleźć fakturę z najwyższym numerem w bieżącym roku
        const lastInvoice = await Invoice.findOne({ userId })
            .sort({ createdAt: -1 });  // Poszukujemy ostatniej faktury użytkownika

        if (lastInvoice) {
            lastNumber = parseInt(lastInvoice.invoiceNumber.split('/')[1]);
        }

        // Rozpoczynamy generowanie numeru faktury, począwszy od 001
        let newNumber = lastNumber + 1;
        let invoiceNumber = `${currentYear}/${String(newNumber).padStart(3, '0')}`;

        // Sprawdzamy, czy numer już istnieje w bazie danych
        let existingInvoice = await Invoice.findOne({ invoiceNumber });
        while (existingInvoice) {
            newNumber++;
            invoiceNumber = `${currentYear}/${String(newNumber).padStart(3, '0')}`;
            existingInvoice = await Invoice.findOne({ invoiceNumber });
        }

        return invoiceNumber;
    } catch (error) {
        console.error('Error generating invoice number:', error);
        return `${new Date().getFullYear()}/001`;  // Domyślny numer
    }
};




export const createInvoice = async (req, res) => {
    try {
        const { client, products, dueDate } = req.body;
        const userId = req.user.id;

        // Pobranie danych klienta
        const clie = await Client.findById(client);
        if (!clie) return res.status(404).json({ message: "Client not found" });

        // Przetwarzanie produktów bezpośrednio z żądania
        const selectedProducts = products.map((item) => {
            const netPrice = item.price * item.quantity;
            const taxAmount = netPrice * (item.taxRate / 100);
            const grossPrice = netPrice + taxAmount;

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

        // Obliczenie całkowitej kwoty faktury
        const totalAmount = selectedProducts.reduce((sum, item) => sum + item.grossPrice, 0);
        const invoiceNumber = await generateInvoiceNumber(userId);

        // Utworzenie nowej faktury
        const invoice = new Invoice({
            user:userId,
            client,
            products: selectedProducts,
            totalAmount,
            invoiceNumber,
            issueDate: new Date(),
            dueDate: new Date(dueDate)
        });

        // Zapisanie faktury do bazy danych
        await invoice.save();

        // Odpowiedź z sukcesem
        return res.status(201).json({ success: true, invoice });

    } catch (error) {
        console.error("Error in create invoice route:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};





export const getAllInvoices = async (req, res) => {
    const userId = req.user.id;
    try{
        const invoices = await Invoice.find({userId});
        return res.status(200).json({success:true,invoices});
    }catch (e) {
        console.log("Error in get all invoices route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getInvoice = async (req, res) => {
    const userId = req.user.id;
    const InvId = req.param.id
    try{
        const invoices = await Invoice.findOne({userId, InvId});
        return res.status(200).json({success:true,invoices});
    }catch (e) {
        console.log("Error in get all invoices route", e);
        res.status(500).json({message: "Internal server error"});
    }
}