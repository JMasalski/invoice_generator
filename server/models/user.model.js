import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[50, "Name must be at most 50 characters"],
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must be at least 8 characters"],
        maxLength:128,
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
        match: [/^\d{26}$/, "Bank account must be 26 digits"], // Walidacja dla polskiego IBAN
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

}, {timestamps: true});

export const User = mongoose.model('User',userSchema);