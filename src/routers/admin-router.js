import { Router } from 'express';
import { productService } from '../services';

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.send('admin main page');
});

//전체 상품 목록을 가져옴
adminRouter.get('/product', async (req, res, next) => {
    try {
        const products = await productService.getProducts();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

//선택한 상품의 상세 정보를 가져옴
adminRouter.get('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productService.getProduct(productId);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

//상품 생성
adminRouter.post('/product/create', async (req, res, next) => {
    try {
        const {
            name,
            price,
            description,
            madeBy,
            category,
            inventory,
            sellCount,
        } = req.body;

        const newProduct = await productService.addProduct({
            name,
            price,
            description,
            madeBy,
            category,
            inventory,
            sellCount,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

//상품 수정
adminRouter.patch('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;

        const {
            name,
            price,
            description,
            madeBy,
            category,
            inventory,
            sellCount,
        } = req.body;

        const toUpdate = {
            ...(name && { name }),
            ...(price && { price }),
            ...(description && { description }),
            ...(madeBy && { madeBy }),
            ...(category && { category }),
            ...(inventory && { inventory }),
            ...(sellCount && { sellCount }),
        };

        const updatedProductInfo = await productService.setProduct(
            productId,
            toUpdate
        );

        res.status(200).json(updatedProductInfo);
    } catch (error) {
        next(error);
    }
});

export { adminRouter };
