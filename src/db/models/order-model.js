import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {

  async findByUser(userId) {
    const orders = await Order.findOne({ user:userId });
    return orders;
  }
  //User의 shortId로 주문 내역 찾기

  async findById(shortId){
    const order = await Order.findOne({shortId});
    return order;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }
  //관리자가 모든 주문 내역 조회

  async deleteOneOrder({shortId}) {
    const filter = { shortId };
    
    const deletedOrder = await Order.deleteOne(filter);
    return deletedOrder;
  }

}

const orderModel = new OrderModel();

export { orderModel };
