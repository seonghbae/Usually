import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
    async findByCategoryIds(categoryIds) {
        //Product의 categoryId가 categoryIds 배열에 속한 값과 같은 것을 찾기
        return await Product.find({
            categoryId: { $in: categoryIds },
        });
    }

    async findAll() {
        return await Product.find({});
    }

    async findByCategory(categoryId) {
        return await Product.find({ categoryId });
    }

    async findById(productId) {
        return await Product.findOne({ productId });
    }

    async create(productInfo) {
        return await Product.create(productInfo);
    }

    async findById(productId) {
        return await Product.findOne({ productId });
    }

    async update({ productId, update }) {
        const filter = { productId };
        const option = { returnOriginal: false };
        //updateOne, findByIdAndUpdate
        return await Product.findOneAndUpdate(filter, update, option);
    }

    async delete({ productId }) {
        const filter = { productId };
        //findOneAndDelete
        return await Product.deleteOne(filter);
    }
}

const productModel = new ProductModel();

export { productModel };
