import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{
        type:String,
        required:true,
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[50, "Name must be at most 50 characters"],
    },
    companyName: {
        type: String,
        maxLength: [100, "Company name must be at most 100 characters"],
    },
    taxId: {
        type: String,
        match: [/^\d{10}$/, "Tax ID must be exactly 10 digits"], // Walidacja NIP dla Polski
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String,
    },
    bankAccount: {
        type: String,
        match: [/^[A-Z]{2}\d{26}$/, "Bank account must start with a country code and have 28 characters in total"], // Walidacja dla polskiego IBAN
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

},{timestamps:true})

export const Client = mongoose.model('Client',clientSchema);