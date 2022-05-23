import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const ProductSchema = new Schema(
    {
        shortId,
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
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
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
    },
    {
        collection: 'products',
        timestamps: true,
    }
);

export { ProductSchema };