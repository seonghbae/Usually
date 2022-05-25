import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('category', CategorySchema);

export class CategoryModel {
    async findAll() {
        const categories = await Category.find({});
        return categories;
    }

    async findById(categoryId) {
        const category = await Category.findOne({ _id: categoryId });
        return category;
    }

    async create(categoryInfo) {
        const createdNewCategory = await Category.create({ categoryInfo });
        return createdNewCategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };
