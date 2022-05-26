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
});

//선택한 카테고리의 상품 목록을 가져옴
productRouter.get('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const products = await productService.getCategoryProducts(categoryId);

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

//선택한 상품의 상세 정보를 가져옴
productRouter.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productService.getProduct(productId);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
