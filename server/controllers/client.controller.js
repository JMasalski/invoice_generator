import { Client } from '../models/client.model.js';
import { createClientSchema, updateClientSchema } from '../schemas/client.schema.js';

export const createClient = async (req, res) => {
    const id = req.user.id
    try {
        const parsedBody = createClientSchema.parse(req.body);
        const client = await Client.create({
            userId: id,
            ...parsedBody
        });
        res.status(201).json({
            success: true,
            client
        });
    } catch (e) {
        console.log("Error in create client route", e.message);
        if (e.name === 'ZodError') {
            return res.status(400).json({ message: "Błąd walidacji danych", errors: e.errors });
        }
        return res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

export const getAllClients = async (req, res) => {
    const userId = req.user.id;
    try {
        const clients = await Client.find({ userId })

        return res.status(200).json({ success: true, clients })

    } catch (e) {
        console.log("Error in get all clients route", e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}


export const updateClient = async (req, res) => {
    const clientId = req.params.id;

    if (!clientId) {
        return res.status(400).json({ message: "Please provide product id" });
    }

    try {
        const parsedBody = updateClientSchema.parse(req.body);
        const updatedClient = await Client.findOneAndUpdate({
            _id: clientId,
            userId: req.user.id
        }, { ...parsedBody }, { new: true });
        if (!updatedClient) {
            return res.status(400).json({ message: "Client not found or user not authorized" });
        }
        res.status(200).json({ success: true, message: "Zaktualizowano klienta", updatedClient })
    } catch (e) {
        console.log("Error in update client route", e);
        if (e.name === 'ZodError') {
            return res.status(400).json({ message: "Błąd walidacji danych", errors: e.errors });
        }
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedClient) {
            return res.status(400).json({ message: "Client not found or user not authorized" });
        }

        const clients = await Client.find({ userId: req.user.id });

        res.status(200).json({
            success: true,
            message: "Client deleted successfully",
            clients
        });
    } catch (e) {
        console.log("Error in delete client route", e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
};
