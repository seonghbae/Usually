import { model } from 'mongoose';
import { OrderedProductSchema, OrderSchema, UserSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);
const OrderedProduct = model('orderedProducts', OrderedProductSchema);
const User = model('users', UserSchema);

export class OrderModel {

  async findByUser(userId) {
    const user =  await User.findOne({shortId :userId});
    const orders = await Order.find({ userId : user._id }).populate({
      path : 'orderProducts',
      populate : { path : 'productId'}
    });
    return orders;
  }
  //User의 shortId로 주문 내역 전부 찾기

  async findById(orderId){
    const order = await Order.findOne({shortId : orderId});
    return order;
  }
  //Order의 shortId로 주문 내역 찾기

  async create(orderInfo, productIds) {
    const createdNewOrder = await Order.create({
      phoneNumber:orderInfo.phoneNumber,
      address:orderInfo.address,
      userId: orderInfo.userId,
      totalPrice: orderInfo.totalPrice,
      totalQuantity:orderInfo.totalQuantity,
      orderedProducts: productIds,
    });
    return createdNewOrder;
  }

  async createOrderedProducts(orderedProductsList){
    const orderedProducts = await OrderedProduct.create(orderedProductsList);
    return orderedProducts;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }
  //관리자가 모든 주문 내역 조회

  async updateOrder(orderId, status){

    const filter = { shortId : orderId };
    const option = { returnOriginal : false };
    const update = { status: status };
    console.log(update);

    const updatedOrder = await Order.updateOne(filter, update, option);
    return updatedOrder;
  }

  async deleteOneOrder({orderId}) {
    const filter = { shortId: orderId };
    
    const deletedOrder = await Order.deleteOne(filter);
    return deletedOrder;
  }

  async deleteOrderedProducts(orderedProductId){
    await OrderedProduct.findOneAndDelete({_id : orderedProductId});
  }

}

const orderModel = new OrderModel();

export { orderModel };
