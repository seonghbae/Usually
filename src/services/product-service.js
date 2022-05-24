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

    //상품을 생성함
    async addProduct(productInfo) {
        const {
            name,
            price,
            description,
            madeBy,
            category,
            inventory,
            sellCount,
        } = productInfo;

        const createNewProduct = await this.productModel.create(productInfo);

        return createNewProduct;
    }
}

const productService = new ProductService(productModel);

export { productService };
