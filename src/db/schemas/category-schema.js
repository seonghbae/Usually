import { Schema } from 'mongoose';
//import { shortId } from './types/short-id';

const CategorySchema = new Schema(
    {
        //shortId,
        name: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'categories',
        timestamps: true,
    }
);

export { CategorySchema };
