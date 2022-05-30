import { productModel } from '../db';

class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }

    async getProductsByCategoryIds(categoryIds) {
        const products = await this.productModel.findByCategoryIds(categoryIds);
        return products;
    }
    //상품 목록을 받음
    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }

    //카테고리의 상품 목록을 받음
    async getCategoryProducts(categoryId) {
        const categoryProducts = await this.productModel.findByCategory(
            categoryId
        );
        return categoryProducts;
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

    //상품을 수정함
    async setProduct(productId, toUpdate) {
        let product = await this.productModel.findById(productId);

        if (!product) {
            throw new Error('상품 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        product = await this.productModel.update({
            productId,
            update: toUpdate,
        });

        return product;
    }

    //상품을 삭제함
    async deleteProduct(productId) {
        let product = await this.productModel.findById(productId);

        if (!product) {
            throw new Error('상품 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        product = await this.productModel.delete({ productId });

        return product;
    }
}

const productService = new ProductService(productModel);

export { productService };
