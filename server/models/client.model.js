import mongoose from 'mongoose';
import {validateNIP} from "../lib/validateNIP.js";


const clientSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{
        type:String,
        required:true,
        minLength:[3,"Nazwa musi zawierać co najmniej 3 znaki"],
        maxLength:[50, "Nazwa musi zawierać co najwyżej 50 znaków"],
    },
    companyName: {
        type: String,
        maxLength: [100, "Nazwa firmy musi zawierać co najwyżej 100 znaków"],
    },
    taxId: {
        type: String,
        validate:{
            validator:validateNIP,
            message: 'Podany NIP jest niepoprawny',
        }
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