import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser'

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import clientRoutes from "./routes/client.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";




const app = express();


app.use(cookieParser())
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT||3000 ;


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/client', clientRoutes)
app.use('/api/v1/invoice', invoiceRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})