import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";




const app = express();

// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://invoice-generator-sp2e.vercel.app'
// ];
//
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin);  // 👈 Zwracaj konkretny origin, a nie "*"
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));
//
app.use(cors({
    origin: ['http://localhost:5173', 'https://invoice-generator-sp2e.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working' });
});
app.use(cookieParser())
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT||3000 ;


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)

app.use('/api/v1/client', clientRoutes)
app.use('/api/v1/invoice', invoiceRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})