import { Router } from 'express';
import { productService } from '../services';

const productRouter = Router();

//전체 상품 목록을 가져옴
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await productService.getProducts();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})

export { productRouter }