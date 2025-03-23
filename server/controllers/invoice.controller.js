import {Invoice} from "../models/invoice.model.js";

import {Client} from "../models/client.model.js";

const generateInvoiceNumber = async (userId) => {
    try {
        const currentYear = new Date().getFullYear();
        // Znajdź ostatnią fakturę użytkownika z bieżącego roku
        const lastInvoice = await Invoice.findOne({ userId, invoiceNumber: { $regex: `^${currentYear}/` } })
            .sort({ createdAt: -1 });

        if (lastInvoice) {
            const lastNumber = parseInt(lastInvoice.invoiceNumber.split('/')[1]);
            const newNumber = lastNumber + 1;
            return `${currentYear}/${String(newNumber).padStart(3, '3')}`;
        } else {
            return `${currentYear}/001`;
        }
    } catch (error) {
        console.error('Error generating invoice number:', error);
        return `${new Date().getFullYear()}/001`;
    }
};




export const createInvoice = async (req, res) => {
    try {
        const { clientId, products } = req.body;
        const userId = req.user.id;

        // Pobranie danych klienta
        const client = await Client.findById(clientId);
        if (!client) return res.status(404).json({ message: "Client not found" });

        // Przetwarzanie produktów bezpośrednio z żądania
        const selectedProducts = products.map((item) => {
            const netPrice = item.price * item.quantity;
            const taxAmount = netPrice * (item.taxRate / 100);
            const grossPrice = netPrice + taxAmount;

            return {
                productName: item.name,
                quantity: item.quantity,
                price: item.price,  // Cena netto
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
            userId,
            clientId: client._id,
            clientName: client.name,
            clientEmail: client.email,
            clientCompany: client.companyName,
            clientTaxId: client.taxId,
            products: selectedProducts,
            totalAmount,
            invoiceNumber,
            issueDate: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // +14 dni
        });

        await invoice.save();
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