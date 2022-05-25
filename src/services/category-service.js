import { categoryModel } from '../db';

class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    //상품 카테고리를 받음
    async getCategories() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
