import { model } from 'mongoose';
import { OrderedProductSchema, OrderSchema } from '../schemas/order-schema';
import { UserSchema } from '../schemas/user-schema';
import { ProductSchema } from '../schemas/product-schema';
const Order = model('orders', OrderSchema);
const OrderedProduct = model('orderedProducts', OrderedProductSchema);
const User = model('users', UserSchema);
const Product = model('products', ProductSchema);

export class OrderModel {

  async findByUser(userId) {
    const user =  await User.findOne({shortId :userId});
    return await Order.find({ userId : user._id }).populate({
      path : 'orderedProducts',
      populate : { path : 'productId'}
    });
  }
  //User의 shortId로 주문 내역 전부 찾기

  async findShippedByUser(userId) {
    const user =  await User.findOne({ shortId :userId });
    return await Order.find({ userId : user._id, status : "배송완료" }).populate({
      path : 'orderedProducts',
      populate : { path : 'productId'}
    });
  }
  //user의 shortId 중 배송 완료한 주문 내역 전부 찾기

  async findById(orderId){
    return await Order.findOne({shortId : orderId}).populate({
      path : 'orderedProducts',
      populate : { path : 'productId'}
    });
  }
  //Order의 shortId로 주문 내역 찾기

  async create(orderInfo, productIds) {
    return await Order.create({
      phoneNumber:orderInfo.phoneNumber,
      address:orderInfo.address,
      userId: orderInfo.userId,
      totalPrice: orderInfo.totalPrice,
      totalQuantity:orderInfo.totalQuantity,
      message: orderInfo.message,
      orderedProducts: productIds,
    });
  }

  async createOrderedProducts(orderedProductsList){
    return await OrderedProduct.create(orderedProductsList);
  }

  async findAll() {
    return await Order.find({}).populate({
      path : 'orderedProducts',
      populate : { path : 'productId'}
    });
  }
  //관리자가 모든 주문 내역 조회

  async updateOrder(orderId, status){

    const filter = { shortId : orderId };
    const option = { returnOriginal : false };
    const update = { status: status };

    return await Order.updateOne(filter, update, option);
  }

  async deleteOneOrder({orderId}) {
    const filter = { shortId: orderId };
    
    return await Order.deleteOne(filter);
  }

  async deleteOrderedProducts(orderedProductId){
    return await OrderedProduct.findOneAndDelete({_id : orderedProductId});
  }

}

const orderModel = new OrderModel();

export { orderModel };

