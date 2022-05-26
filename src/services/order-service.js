import { orderModel } from '../db';

import bcrypt from 'bcrypt';

class OrderService {
  // 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 회원가입
  async addOrder(orderInfo) {
    // 객체 destructuring
    const { user, phoneNumber, address, message, products, totalPrices } = orderInfo;

    // db에 저장
    const createdNewOrder = await this.orderModel.create(orderInfo);

    return createdNewOrder;
  }

  // 모든 주문 목록을 받음.
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async deleteOrder(userInfoRequired){

     // 객체 destructuring
     const { shortId, currentPassword } = userInfoRequired;

     console.log("currentPassword" +currentPassword);

     // 우선 해당 id의 유저가 db에 있는지 확인
     let user = await this.userModel.findById(shortId);
 
     // db에서 찾지 못한 경우, 에러 메시지 반환
     if (!user) {
       throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
     }
 
     // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함
 
     // 비밀번호 일치 여부 확인
     const correctPasswordHash = user.password;
     const isPasswordCorrect = await bcrypt.compare(
       currentPassword,
       correctPasswordHash
     );
 
     if (!isPasswordCorrect) {
       throw new Error(
         '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
       );
     }
 
     // 유저 삭제 시작
     user = await this.userModel.deleteOneUser({
       shortId
     });
 
     return user;

  }
}

const orderService = new OrderService(orderModel);

export { orderService };
