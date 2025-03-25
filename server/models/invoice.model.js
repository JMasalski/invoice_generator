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
        unit: { type: String, required: true },
        netPrice: { type: Number, required: true },
        taxAmount: { type: Number, required: true },
        grossPrice: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true, min: 0 },
    invoiceNumber:{type: String, required: true},
    issueDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function(value) {
                // Sprawdzenie, czy data wystawienia nie jest w przyszłości
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
                // Sprawdzenie, czy data płatności jest po dacie wystawienia
                return value > this.issueDate;
            },
            message: 'Data płatności musi być późniejsza niż data wystawienia'
        }
    }
}, {
    timestamps: true
});

// Dodatkowa walidacja przed zapisem
invoiceSchema.pre('save', function(next) {
    // Sprawdzenie poprawności produktów
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

    // Dodatkowe sprawdzenie całkowitej kwoty
    if (this.totalAmount < 0) {
        return next(new Error('Całkowita kwota nie może być ujemna'));
    }

    next();
});



export const Invoice = mongoose.model('Invoice', invoiceSchema);