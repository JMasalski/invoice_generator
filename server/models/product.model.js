import mongoose from 'mongoose';

const produtSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
            minLength: [3, "Name must be at least 3 characters"],
            description: [500, "Description must be at most 500 characters"]
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price must be at least 0"],
        },
        taxRate: {
            type: Number,
            required: true,
            min: [0, "Tax rate must be at least 0"],
            max: [100, "Tax rate must be at most 100"]
        }
    },
    {timestamps: true})

export const Product = mongoose.model('Product', produtSchema)