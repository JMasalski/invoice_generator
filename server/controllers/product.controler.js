import {Product} from "../models/product.model.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
    const {name, price, taxRate} = req.body;
    const userId = req.user.id;
    if (!name || !price || !taxRate) {
        return res.status(400).json({message: "Please fill all the fields"});
    }
    if (!userId) {
        return res.status(400).json({message: "Unauthorized"});
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const newProduct = await Product.create([{
            userId,
            name,
            price,
            taxRate
        }], {session});
        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct[0]
        });
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        console.log("Error in add product route", e);
        res.status(500).json({message: "Internal server error"});
    }

}

export const getAllProducts = async (req, res) => {
    const userId = req.user.id;

    try {
        const products = await Product.find({userId});
        return res.status(200).json({success: true, products});
    } catch (e) {
        console.log("Error in get all products route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getProduct = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({message: "Please provide product id"});
    }

    try {
        const product = await Product.findById(productId);
        if (product.userId.toString() !== userId.toString()) {
            return res.status(400).json({message: "Unauthorized"});
        }
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json({success: true, product});
    } catch (e) {
        console.log("Error in get product route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProduct = async (req, res) => {

    const userId = req.user.id;
    const productId = req.params.id;
    const {...data} = req.body;

    if (!productId) {
        return res.status(400).json({message: "Please provide product id"});
    }

    try {
        const product = await Product.findByIdAndUpdate(productId,
            {...data}
            , {new: true});

        if (product.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this product" });
        }
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })
    } catch (e) {
        console.log("Error in update product route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteProduct =async(req,res) =>{
    const userId = req.user.id;
    const productId = req.params.id;

    if(!productId){
        return res.status(400).json({message: "Please provide product id"});
    }
    try{
        const product = await Product.findById(productId);
        if (product.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this product" });
        }
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        await Product.findByIdAndDelete(productId);
        const updatedProducts = await Product.find({ userId });
        res.status(200).json({
            success:true,
            message: "Product deleted successfully",
            products: updatedProducts
        })
    }catch (e) {
        console.log("Error in delete product route", e);
        res.status(500).json({success:false,message: "Internal server error"});
    }
}