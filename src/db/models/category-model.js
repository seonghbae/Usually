import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('category', CategorySchema);

export class CategoryModel {
    async findByTypeTarget(categoryInfo) {
        let { type, target } = categoryInfo;
        let query = {};
        query[type] = target;

        return await Category.find(query);
    }

    async findAll() {
        return await Category.find({});
    }

    async findById(categoryId) {
        return await Category.findOne({ categoryId });
    }

    async create(categoryInfo) {
        return await Category.create(categoryInfo);
    }

    async update({ categoryId, update }) {
        const filter = { categoryId };
        const option = { returnOriginal: false };

        return await Category.findOneAndUpdate(filter, update, option);
    }

    async delete({ categoryId }) {
        const filter = { categoryId };

        return await Category.deleteOne(filter);
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };
