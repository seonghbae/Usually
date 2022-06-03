import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const KakaoSchema = new Schema(
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
        role: {
            type: String,
            required: false,
            default: 'basic-user',
        },
        refreshToken:{
            type:String,
            required:true,
        }
  },
  {
    collection: 'kakaos',
    timestamps: true,
  }
);

export { KakaoSchema };
