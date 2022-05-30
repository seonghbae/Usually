import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const CategorySchema = new Schema(
    {
        categoryId: shortId,
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        recommendAge: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'categories',
        timestamps: true,
    }
);

export { CategorySchema };
