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

    async findById(productId) {
        const product = await Product.findOne({ _id: productId });
        return product;
    }

    async update({ productId, update }) {
        const filter = { _id: productId };
        const option = { returnOriginal: false };

        const updateProduct = await Product.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updateProduct;
    }
}

const productModel = new ProductModel();

export { productModel };
