import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService, userService } from '../services';
const orderRouter = Router();

// 주문 api (아래는 /purchase이지만, 실제로는 /order/purchase로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.post('/purchase', loginRequired, async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req (request)의 body 에서 데이터 가져오기

        const {
            phoneNumber,
            address,
            orderedProducts,
            totalPrice,
            totalQuantity,
            message,
            status,
        } = req.body;

        const user = await userService.getUser(req.currentUserId);

        // 위 데이터를 유저 db에 추가하기
        const newOrder = await orderService.addOrder({
            userId: user._id,
            phoneNumber,
            address,
            orderedProducts,
            totalPrice,
            totalQuantity,
            message,
            status,
        });

        // 추가된 주문 내역의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});

//회원의 주문 목록 확인 api (아래는 /list 이지만, 실제로는 /purchase/list으로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.get('/list', loginRequired, async function (req, res, next) {
    try {
        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user = await userService.getUser(req.currentUserId);

        if (!user) {
            throw new Error('없는 사용자입니다.');
        }

        // 주문 목록 전부 반환
        const orders = await orderService.getOrdersByUser(req.currentUserId);

        //주묵 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

//회원의 주문 목록 확인 api (아래는 /list 이지만, 실제로는 /purchase/list으로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.get('/shippedlist', loginRequired, async function (req, res, next) {
    try {
        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user = await userService.getUser(req.currentUserId);

        if (!user) {
            throw new Error('없는 사용자입니다.');
        }

        // 주문 목록 전부 반환
        const orders = await orderService.getShippedOrdersByUser(
            req.currentUserId
        );

        //주묵 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

//회원의 주문 목록 상세 확인 api (아래는 /list 이지만, 실제로는 /purchase/list으로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.get(
    '/list/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderId = req.params.orderId;

            // 주문 목록 전부 반환
            const order = await orderService.getOrder(orderId);

            if (!order) {
                throw new Error('존재하지 않는 주문 내역입니다.');
            }

            //주묵 내역 하나를 JSON 형태로 프론트에 보냄
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

orderRouter.patch('/:orderId', loginRequired, async function (req, res, next) {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // params로부터 id를 가져옴
        const orderId = req.params.orderId;

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const { status } = req.body;

        // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
        // 보내주었다면, 업데이트용 객체에 삽입함.

        // 사용자 정보를 업데이트함.
        const updatedOrderInfo = await orderService.setOrder(orderId, status);

        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).json(updatedOrderInfo);
    } catch (error) {
        next(error);
    }
});

// 주문을 하나 취소함 (아래는 /cancel 이지만, 실제로는 /order/cancel 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.delete(
    '/cancel/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderId = req.params.orderId;

            const deletedOrder = await orderService.deleteOrder(orderId);

            if (!deletedOrder) {
                throw new Error('주문 내역이 존재하지 않습니다.');
            }

            // 취소된 주문 내역을 프론트에 보내줌
            res.status(200).json(deletedOrder);
        } catch (error) {
            next(error);
        }
    }
);

export { orderRouter };
