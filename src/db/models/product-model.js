import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {

}

const productModel = new ProductModel();

export { productModel };