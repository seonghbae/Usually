import { Router } from 'express';
import { productService } from '../services';

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.send("admin main page")
})

adminRouter.get('/products', async (req, res, next) => {
    try {
        const products = await productService.getProducts();
        
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})



export { adminRouter }