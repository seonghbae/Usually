import { productModel } from '../db';

class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }

    async getProductsByCategoryIds(categoryIds) {
        return await this.productModel.findByCategoryIds(categoryIds);
    }
    //상품 목록을 받음
    async getProducts() {
        return await this.productModel.findAll();
    }

    //카테고리의 상품 목록을 받음
    async getCategoryProducts(categoryId) {
        return await this.productModel.findByCategory(categoryId);
    }

    //상품 상세 정보를 받음
    async getProduct(productId) {
        return this.productModel.findById(productId);
    }

    //상품을 생성함
    async addProduct(productInfo) {
        return await this.productModel.create(productInfo);
    }

    //상품을 수정함
    async setProduct(productId, updatedProductInfo) {
        let product = await this.productModel.findById(productId);

        if (!product) {
            throw new Error('상품 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        return await this.productModel.update({
            productId,
            update: updatedProductInfo,
        });
    }

    //상품을 삭제함
    async deleteProduct(productId) {
        let product = await this.productModel.findById(productId);

        if (!product) {
            throw new Error('상품 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        return await this.productModel.delete({ productId });
    }
}

const productService = new ProductService(productModel);

export { productService };
