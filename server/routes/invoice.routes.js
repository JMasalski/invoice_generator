import {Router} from 'express'
import {createInvoice, getAllInvoices, getInvoice, invoicePDF} from "../controllers/invoice.controller.js";
import {protectRoute} from "../middleware/auth.js";

const invoiceRouter = Router();
//http://localhost:3000/api/v1/invoice/create-invoice
invoiceRouter.post('/create-invoice',protectRoute ,createInvoice);
invoiceRouter.get('/get-invoices',protectRoute ,getAllInvoices);
invoiceRouter.get('/get-invoice/:id',protectRoute ,getInvoice);
invoiceRouter.get('/create-pdf/:id',protectRoute ,invoicePDF);

export default invoiceRouter;