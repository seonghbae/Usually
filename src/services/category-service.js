import { categoryModel } from '../db';

class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    //카테고리 이름 리스트를 받음
    async getName() {
        return await this.categoryModel.findByName();
    }
    //카테고리 성별 리스트를 받음
    async getGender() {
        return await this.categoryModel.findByGender();
    }

    //카테고리 추천 나이 리스트를 받음
    async getRecommendAge() {
        return await this.categoryModel.findByRecommendAge();
    }

    //각 파라미터에 맞는 카테고리 아이디를 받음
    async getCategoryId(categoryInfo) {
        return await this.categoryModel.findCategoryId(categoryInfo);
    }

    //선택한 type으로 구분된 target 카테고리의 상품 목록을 받음
    async getTypeTargetProducts(categoryInfo) {
        return await this.categoryModel.findByTypeTarget(categoryInfo);
    }

    //상품 카테고리를 받음
    async getCategories() {
        return await this.categoryModel.findAll();
    }

    //상세 카테고리 정보를 받음
    async getCategory(categoryId) {
        return await this.categoryModel.findById(categoryId);
    }

    //카테고리를 생성함
    async addCategory(categoryInfo) {
        return await this.categoryModel.create(categoryInfo);
    }

    //카테고리를 수정함
    async setCategory(categoryId, UpdatedCategoryInfo) {
        let category = await this.categoryModel.findById(categoryId);

        if (!category) {
            throw new Error(
                '카테고리 내역이 없습니다. 다시 한 번 확인해 주세요.'
            );
        }

        return await this.categoryModel.update({
            categoryId,
            update: UpdatedCategoryInfo,
        });
    }

    async deleteCategory(categoryId) {
        let category = await this.categoryModel.findById(categoryId);

        if (!category) {
            throw new Error(
                '카테고리 내역이 없습니다. 다시 한 번 확인해 주세요.'
            );
        }

        return await this.categoryModel.delete({ categoryId });
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
