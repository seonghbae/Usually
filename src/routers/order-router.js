import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService } from '../services';
import { userService } from '../services';

const orderRouter = Router();

// 회원가입 api (아래는 /purchase이지만, 실제로는 /order/purchase로 요청해야 함.)
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

    //loginRequired에서 로그인한 회원의 정보 가져오기
    const user =  await userService.getUser(req.currentUserId);

    if(!user){
        throw new Error('없는 사용자입니다.');
    }

    // req (request)의 body 에서 데이터 가져오기

    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const message = req.body.message;
    const products = req.body.products;
    const totalPrice = req.body.totalPrice;

       // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      user,
      phoneNumber,
      address,
      message,
      products,
      totalPrice,
    });

    // 추가된 주문 내역의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 관리자가 주문 내역 전부 확인하는 api (아래는 /orderlist 이지만, 실제로는 /order/orderlist로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.get('/orderlist', loginRequired, async function (req, res, next) {
    try {
        
    //loginRequired에서 로그인한 회원의 정보 가져오기
    const user =  await userService.getUser(req.currentUserId);

    if(!user){
        throw new Error('없는 사용자입니다.');
    }

    //관리자가 아닐 경우 접근할 수 없도록 return
    if(user.role != 'admin'){
        console.log('서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자만 사용할 수 있는 서비스입니다.',
    });

  
    return;
    }


    // 주문 목록 전부 반환
    const orders = await orderService.getOrders();
    
    //주묵 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orders);
    
  } catch (error) {
    next(error);
  }
});

//회원의 주문 목록 확인 api (아래는 /list 이지만, 실제로는 /purchase/list으로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.get('/list', loginRequired, async function(req, res, next) {
    
    try {
        
        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user =  await userService.getUser(req.currentUserId);
    
        if(!user){
            throw new Error('없는 사용자입니다.');
        }
    
        // 주문 목록 전부 반환
        const orders = await orderService.getOrdersByUser(user.id);
        
        //주묵 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(orders);
        
      } catch (error) {
        next(error);
      }
});

//회원의 주문 목록 상세 확인 api (아래는 /list 이지만, 실제로는 /purchase/list으로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.get('/list/:shortId', loginRequired, async function(req, res, next){
    try {

        const shortId = req.params.shortId;
    
        // 주문 목록 전부 반환
        const order = await orderService.getOrder(shortId);

        if(!order){
            throw new Error('존재하지 않는 주문 내역입니다.');
        }
        
        //주묵 내역 하나를 JSON 형태로 프론트에 보냄
        res.status(200).json(order);
        
      } catch (error) {
        next(error);
      }
})


// 주문을 하나 취소함 (아래는 /cancel 이지만, 실제로는 /order/cancel 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
orderRouter.delete('/cancel/:shortId', loginRequired, async function (req, res, next) {
    try {
       

    const shortId  = req.params.shortId;


    const deletedOrder = await orderService.deleteOrder(shortId);


    if(!deletedOrder){
        throw new Error('주문 내역이 존재하지 않습니다.');
    }

    // 취소된 주문 내역을 프론트에 보내줌
    res.status(200).json(deletedOrder);
    } catch (error) {
        next(error);
    }
});


export { orderRouter };
