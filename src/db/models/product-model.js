import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
    async findAll() {
        const products = await Product.find({});
        return products;
    }
}

const productModel = new ProductModel();

export { productModel };