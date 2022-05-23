import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('category', CategorySchema);

export class CategoryModel {

}

const categoryModel = new CategoryModel();

export { categoryModel };