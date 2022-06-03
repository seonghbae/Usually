import { reviewModel } from '../db';

class ReviewService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }

    async getPaginatedReviews(reviewInfo) {
        const { query, page, perPage, productId } = reviewInfo;

        return await this.reviewModel.findPaginatedReviews({
            query,
            page,
            perPage,
            productId,
        });
    }

    async getReview(reviewId) {
        return await this.reviewModel.findById(reviewId);
    }

    async createReview(reviewInfo) {
        return await this.reviewModel.create(reviewInfo);
    }

    async updateReview(reviewId, reviewInfo) {
        return await this.reviewModel.update(reviewId, reviewInfo);
    }

    async deleteReview(reviewId) {
        return await this.reviewModel.delete(reviewId);
    }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
