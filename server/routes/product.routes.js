import {Router} from "express";

import {protectRoute} from "../middleware/auth.js";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct
} from "../controllers/product.controler.js";

const productRoutes = Router();

//http://localhost:3000/api/v1/product/create
productRoutes.post('/create/', protectRoute, addProduct);
//http://localhost:3000/api/v1/product/get-all-products
productRoutes.get('/get-all-products', protectRoute, getAllProducts);
//http://localhost:3000/api/v1/product/get-product/67bcc6991f441b6474852ff3
productRoutes.get('/get-product/:id', protectRoute, getProduct);
//http://localhost:3000/api/v1/product/update-product/67bcc6991f441b6474852ff3
productRoutes.put('/update-product/:id', protectRoute, updateProduct);
//http://localhost:3000/api/v1/product/delete-product/67bcc6991f441b6474852ff3
productRoutes.delete('/delete-product/:id', protectRoute, deleteProduct);

export default productRoutes;