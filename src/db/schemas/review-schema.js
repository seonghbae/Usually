import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const ReviewSchema = new Schema(
    {
        reviewId: shortId,
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'reviews',
        timestamps: true,
    }
);

export { ReviewSchema };
