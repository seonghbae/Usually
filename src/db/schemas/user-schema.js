import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const UserSchema = new Schema(
    {
        shortId,
        email: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        address: {
            type: new Schema(
                {
                    postalCode: String,
                    address1: String,
                    address2: String,
                },
                {
                    _id: false,
                }
            ),
            required: false,
        },
        role: {
            type: String,
            required: false,
            default: 'basic-user',
        },
        gender: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'users',
        timestamps: true,
    }
);

export { UserSchema };
