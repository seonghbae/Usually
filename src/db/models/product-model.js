import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
    async findAll() {
        const products = await Product.find({});
        return products;
    }

    async findById(productId) {
        const product = await Product.findOne({ _id: productId });
        return product;
    }

    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }
}

const productModel = new ProductModel();

export { productModel };
