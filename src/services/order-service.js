import { orderModel } from '../db';

class OrderService {
  // 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  //주문 db에 넣기
  async addOrder(orderInfo) {

    // db에 저장
    const createdNewOrder = await this.orderModel.create(orderInfo);

   return createdNewOrder;
  }

  // 관리자가 모든 주문 목록을 받음.
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOrdersByUser(userId){
    const orders = await this.orderModel.findByUser(userId);
    return orders;
  }

  async getOrder(shortId){
    const order = await this.orderModel.findById(shortId);
    return order;
  }

  async deleteOrder(shortId){

     //해당 주문 정보가 존재하는지 확인
     let order = await this.orderModel.findById(shortId);
 
     // db에서 찾지 못한 경우, 에러 메시지 반환
     if (!order) {
       throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
     }
 
     // 주문 취소 시작
     order = await this.orderModel.deleteOneOrder({
       shortId
     });
 
     return order;

  }
}

const orderService = new OrderService(orderModel);

export { orderService };