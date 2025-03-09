import {Invoice} from "../models/invoice.model.js";
import {Product} from "../models/product.model.js";
import {Client} from "../models/client.model.js";

const generateInvoiceNumber = async (userId) => {
    const lastInvoice = await Invoice.findOne({userId}).sort({ createdAt: -1 });

    let newNumber;
    const year = new Date().getFullYear();

    if (lastInvoice) {
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/").pop(), 10);
        newNumber = `${year}/${String(lastNumber + 1).padStart(3, "0")}`;
    } else {
        newNumber = `${year}/001`;
    }

    return newNumber;
};

export const createInvoice = async (req, res) => {
    try {
        const { clientId, products } = req.body;
        const userId = req.user.id;

        // Pobranie danych klienta
        const client = await Client.findById(clientId);
        if (!client) return res.status(404).json({ message: "Client not found" });

        // Pobranie danych o produktach
        const selectedProducts = await Promise.all(products.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) throw new Error(`Product not found: ${item.productId}`);

            return {
                productId: product._id,
                productName: product.name,
                quantity: item.quantity,
                price: product.price, // Cena netto
                taxRate: product.taxRate,
                netPrice: product.price * item.quantity,
                taxAmount: (product.price * item.quantity) * (product.taxRate / 100),
                grossPrice: (product.price * item.quantity) + ((product.price * item.quantity) * (product.taxRate / 100))
            };
        }));

        // Obliczenie całkowitej kwoty faktury
        const totalAmount = selectedProducts.reduce((sum, item) => sum + item.grossPrice, 0);
        const invoiceNumber = await generateInvoiceNumber(userId);


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