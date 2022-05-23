import { Router } from 'express';
import { productService } from '../services';

const productRouter = Router();

productRouter.get('/', (req, res) => {
    res.send("product test")
})

export { productRouter }