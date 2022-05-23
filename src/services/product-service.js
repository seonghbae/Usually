import { productModel } from '../db';

class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
}

const productService = new ProductService(productModel);

export { productService };