import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: { type: String, required: true },
        taxId: { type: String, required: true },
        company: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            postalCode: { type: String, required: true },
            city: { type: String, required: true }
        },
        bankAccount: { type: String, required: true }
    },

    client: {
        name: { type: String },
        company: { type: String },
        taxId: { type: String },
        address: {
            street: { type: String },
            postalCode: { type: String },
            city: { type: String }
        },
        bankAccount: { type: String }
    },

    products: [{
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true, min: 0 },
        taxRate: { type: Number, required: true, min: 0, max: 100 },
        unit: { type: String, required: true },
        netPrice: { type: Number, required: true },
        taxAmount: { type: Number, required: true },
        grossPrice: { type: Number, required: true }
    }],

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

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

// Opcjonalny hook do generowania numeru faktury
invoiceSchema.pre('save', function(next) {
    if (!this.invoiceNumber) {
        // Prosty generator numeru faktury
        this.invoiceNumber = `INV-${Date.now()}`;
    }
    next();
});

export const Invoice = mongoose.model('Invoice', invoiceSchema);