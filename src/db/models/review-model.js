import { model } from 'mongoose';
import { ReviewSchema } from '../schemas/review-schema';
import { UserSchema } from '../schemas/user-schema';
const Review = model('review', ReviewSchema);
const User = model('users', UserSchema);
export class ReviewModel {
    async findPaginatedReviews({ query, page, perPage, productId }) {
        const result = await Promise.all([
            Review.countDocuments({ productId }),
            Review.find({ productId })
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage)
                .populate({ path: 'author' }),
        ]);
        return result;
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
