import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const OrderedProductSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'orderedProducts',
    }
);

const OrderSchema = new Schema(
    {
        shortId,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
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
            required: true,
        },
        orderedProducts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'orderedProducts',
                required: true,
            },
            {
                _id: false,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        totalQuantity: {
            type: Number,
            required: true,
        },
        message: {
            //배송시 요청 사항
            type: String,
            default: '배송 전 연락 주세요',
        },
        status: {
            type: String,
            default: '상품준비중',
        },
    },
    {
        collection: 'orders',
        timestamps: true,
    }
);

export { OrderSchema, OrderedProductSchema };
