import mongoose from 'mongoose';
const invoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userTaxId: { type: String, required: true },
    userCompany: { type: String, required: true },
    userAddress: { type: String, required: true },
    userBankAccount: { type: String, required: true },

    clientName: String,
    clientEmail: String,
    clientCompany: String,
    clientTaxId: String,

    products: [{
        productName: String,
        quantity: Number,
        price: Number,
        taxRate: Number,
        unit: String,
        netPrice: Number,
        taxAmount: Number,
        grossPrice: Number
    }],

    totalAmount: { type: Number, required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
}, { timestamps: true });

export const Invoice = mongoose.model('Invoice', invoiceSchema);
