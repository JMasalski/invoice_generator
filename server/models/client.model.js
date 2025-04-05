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
        },
        unique:true,
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String,
    },
    bankAccount: {
        type: String,
        match: [/^\d{26}$/, "Numer konta składa się z 26 cyfr"], // Walidacja dla konta bankowego z 26 cyframi
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

},{timestamps:true})

export const Client = mongoose.model('Client',clientSchema);