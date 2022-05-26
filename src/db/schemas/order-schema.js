import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const OrderSchema = new Schema(
    {
        shortId,
        user:{
            type:String,
            ref:'User',
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
        message: { //배송시 요청 사항
            type:String,
            default: "배송 전 연락 주세요",
        },
        products:[{ 
            type: new Schema({
                itemId:String,      //itemId에 product.shortId로 넣는다 
                itemName: String,   //아이템 이름
                qty:Number,         //주문한 아이템의 양
                price:Number,       //각각 가격
            })
        }],
        totalPrice:{
            type:Number,
            required:true,
        }
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
