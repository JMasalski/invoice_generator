import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    products: [{
        productName: { type: String },
        quantity: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true, min: 0 },
        taxRate: { type: Number, required: true, min: 0, max: 100 },
        unit: { type: String },
        netPrice: { type: Number, required: true },
        taxAmount: { type: Number, required: true },
        grossPrice: { type: Number, required: true }
    }],
    totalNetAmount: { type: Number, required: true, min: 0 }, // Suma wartości netto
    totalTaxAmount: { type: Number, required: true, min: 0 }, // Suma VAT
    totalGrossAmount: { type: Number, required: true, min: 0 }, // Suma brutto

    invoiceNumber: { type: String, required: true },
    issueDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Data wystawienia nie może być w przyszłości'
        }
    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {

                const issueDateOnly = new Date(this.issueDate);
                issueDateOnly.setHours(0, 0, 0, 0);

                const dueDateOnly = new Date(value);
                dueDateOnly.setHours(0, 0, 0, 0);

                return dueDateOnly >= issueDateOnly;
            },
            message: 'Data płatności nie może być wcześniejsza niż data wystawienia'
        }
    },
    paymentType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


invoiceSchema.pre('save', function(next) {
    if (this.products && this.products.length > 0) {
        const invalidProduct = this.products.find(
            product =>
                product.quantity <= 0 ||
                product.price < 0 ||
                product.taxRate < 0 ||
                product.taxRate > 100
        );

        if (invalidProduct) {
            return next(new Error('Nieprawidłowe dane produktu'));
        }
    }

    if (this.totalAmount < 0) {
        return next(new Error('Całkowita kwota nie może być ujemna'));
    }

    next();
});



export const Invoice = mongoose.model('Invoice', invoiceSchema);