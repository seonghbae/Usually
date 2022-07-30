import { orderModel } from '../db';

class OrderService {
    // 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    //주문 db에 넣기
    async addOrder(orderInfo) {
        // db에 저장
        const productIds = [];

        for (var i = 0; i < orderInfo.orderedProducts.length; i++) {
            const orderedProduct = await this.orderModel.createOrderedProducts(
                orderInfo.orderedProducts[i]
            );
            console.log(orderedProduct._id);
            console.log(orderInfo.orderedProducts[i]);
            await this.orderModel.setSellCount(
                orderInfo.orderedProducts[i].productId,
                orderInfo.orderedProducts[i].quantity
            );
            productIds.push(orderedProduct._id);
        }

        return await this.orderModel.create(orderInfo, productIds);
    }

    // 관리자가 모든 주문 목록을 받음.
    async getOrders() {
        return await this.orderModel.findAll();
    }

    async getOrdersByUser(userId) {
        return await this.orderModel.findByUser(userId);
    }

    async getShippedOrdersByUser(userId) {
        return await this.orderModel.findShippedByUser(userId);
    }

    async getOrder(orderId) {
        return await this.orderModel.findById(orderId);
    }

    async setOrder(orderId, status) {
        //해당 id의 주문 내역이 db에 있는지 확인
        let order = await this.orderModel.findById(orderId);

        if (!order) {
            throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        return await this.orderModel.updateOrder(orderId, status);
    }

    async deleteOrder(orderId) {
        //해당 주문 정보가 존재하는지 확인
        let order = await this.orderModel.findById(orderId);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!order) {
            throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }

        for (var i = 0; i < order.orderedProducts.length; i++) {
            await this.orderModel.deleteOrderedProducts(
                order.orderedProducts[i]._id
            );
        }

        // 주문 취소 시작
        return await this.orderModel.deleteOneOrder({
            orderId,
        });
    }
}

const orderService = new OrderService(orderModel);

export { orderService };
