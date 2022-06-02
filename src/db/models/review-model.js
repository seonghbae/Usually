import { model } from 'mongoose';
import { ReviewSchema } from '../schemas/review-schema';

const Review = model('review', ReviewSchema);

export class ReviewModel {
    async findPaginatedReviews({ query, page, perPage, productId }) {
        //console.log(query + ' ' + page + ' ' + perPage + '' + productId);
        return await Promise.all([
            Review.countDocuments(query),
            Review.find({ productId })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage)
                .populate('author'),
        ]);
    }

    async findById(reviewId) {
        return await Review.findOne({ reviewId }).populate('author');
    }

    async create(reviewInfo) {
        return await Review.create(reviewInfo);
    }

    async update(reviewId, reviewInfo) {
        const option = { returnOriginal: false };
        return await Review.findOneAndUpdate({ reviewId }, reviewInfo, option);
    }

    async delete(reviewId) {
        return await Review.deleteOne({ reviewId });
    }
}

const reviewModel = new ReviewModel();

export { reviewModel };
