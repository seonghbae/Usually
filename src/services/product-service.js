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
 
    //상품 상세 정보를 받음
    async getProduct(productId) {
        const product = await this.productModel.findById(productId);
        return product;
    }
}

const productService = new ProductService(productModel);

export { productService };