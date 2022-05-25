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

    //상세 카테고리 정보를 받음
    async getCategory(categoryId) {
        const category = await this.categoryModel.findById(categoryId);
        return category;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
