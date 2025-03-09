import {Router} from 'express';
import {protectRoute} from "../middleware/auth.js";
import {
    createClient,
    deleteClient,
    getAllClients,
    getOneClient,
    updateClient
} from "../controllers/client.controller.js";

const clientRoutes = Router();

//http://localhost:3000/api/v1/client/create-client
clientRoutes.post('/create-client',protectRoute, createClient)
//http://localhost:3000/api/v1/client/get-all-clients
clientRoutes.get('/get-all-clients',protectRoute, getAllClients)
//http://localhost:3000/api/v1/client/get-one-clients/67c34a61a68dc90663e6d19e
clientRoutes.get('/get-one-client/:id',protectRoute, getOneClient)
//http://localhost:3000/api/v1/client/update-client/67c34a61a68dc90663e6d19e
clientRoutes.put('/update-client/:id',protectRoute, updateClient)
//http://localhost:3000/api/v1/client/delete-client/67c34a61a68dc90663e6d19e
clientRoutes.delete('/delete-client/:id',protectRoute, deleteClient)


export default clientRoutes;