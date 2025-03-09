import mongoose from 'mongoose';
const invoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

    clientName: String,
    clientEmail: String,
    clientCompany: String,
    clientTaxId: String,

    products: [{
        productId: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
        productName: String,
        quantity: Number,
        price: Number,
        taxRate: Number,
        netPrice: Number,
        taxAmount:Number,
        grossPrice:Number
    }],

    totalAmount: { type: Number, required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
}, { timestamps: true });

export const Invoice = mongoose.model('Invoice', invoiceSchema);