import { categoryModel } from '../db';

class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };