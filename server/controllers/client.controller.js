import {Client} from '../models/client.model.js';

export const createClient = async (req, res) => {
    const id = req.user.id
    const {name, email, companyName, taxId, address, bankAccount, phone} = req.body;
    if (!name|| !email || !companyName || !taxId || !address || !bankAccount || !phone) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const client = await Client.create({
            userId: id,
            name,
            email,
            companyName,
            taxId,
            address,
            bankAccount,
            phone
        });
        res.status(201).json({
            success: true,
            client
        });
    } catch (e) {
        console.log("Error in create client route", e);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getAllClients = async (req,res) =>{
    const userId = req.user.id;
    try{
        const clients = await Client.find({userId})

        return res.status(200).json({success:true,clients})

    }catch (e) {
        console.log("Error in get all clients route", e);
        res.status(500).json({message: "Internal server error"});
    }
}
export const getOneClient = async (req,res) =>{

    try{
        const client = await Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        })

        return res.status(200).json({success:true,client})

    }catch (e) {
        console.log("Error in get all clients route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateClient = async (req,res) => {
    const {...data} = req.body;
    const clientId = req.params.id;

    if (!clientId) {
        return res.status(400).json({message: "Please provide product id"});
    }

    try{
        const updatedClient = await Client.findOneAndUpdate({
            _id: clientId,
            userId: req.user.id
        }, {...data}, {new: true});
        if(!updatedClient){
            return res.status(400).json({message: "Client not found or user not authorized"});
        }
        res.status(200).json({success:true, updatedClient})
        }catch (e) {
        console.log("Error in update client route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteClient = async (req,res) =>{
    try{
        const deletedClient = await Client.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if(!deletedClient){
            return res.status(400).json({message: "Client not found or user not authorized"});
        }
        res.status(200).json({success:true, message: "Client deleted successfully"})
    }catch (e) {
        console.log("Error in delete client route", e);
        res.status(500).json({message: "Internal server error"});
    }
}