import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

    clientName: String,
    clientEmail: String,
    clientCompany: String,
    clientTaxId: String,

    products: [{
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },  // Cena netto
        taxRate: { type: Number, required: true }, // Stawka VAT
        netPrice: { type: Number, required: true }, // Kwota netto
        taxAmount: { type: Number, required: true }, // Kwota podatku
        grossPrice: { type: Number, required: true }, // Kwota brutto
        unit: { type: String, required: true } // Jednostka miary
    }],

    totalAmount: { type: Number, required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true }
}, { timestamps: true });

invoiceSchema.index({ userId: 1, invoiceNumber: 1 }, { unique: true });

export const Invoice = mongoose.model('Invoice', invoiceSchema);
