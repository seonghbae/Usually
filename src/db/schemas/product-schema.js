import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const ProductSchema = new Schema(
    {
        productId: shortId,
        categoryId: {
            type: String,
            ref: 'Category',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        madeBy: {
            type: String,
            required: true,
        },
        inventory: {
            type: Number,
            required: true,
            default: 0,
        },
        sellCount: {
            type: Number,
            required: true,
            default: 0,
        },
        src: {
            type: String,
            required: true,
            default: '',
        },
    },
    {
        collection: 'products',
        timestamps: true,
    }
);

export { ProductSchema };
