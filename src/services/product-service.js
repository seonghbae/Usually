import { productModel } from '../db';

class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    //상품 목록을 받음
    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }
}

const productService = new ProductService(productModel);

export { productService };