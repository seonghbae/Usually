import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';

const orderCount = document.getElementById('my-page-order-count');
const orderTotalPrice = document.getElementById('my-page-total-price');
async function myPageView() {
    try {
        const orderList = await Api.get('/order', 'list');
        if (!orderList) {
            throw new Error('회원 주문정보를 불러오는 것에 실패했습니다');
        }
        //내 주문정보를 array로 받은 후, 주문 개수(배열 길이)만큼 "총 주문회수"에 표시
        //내 주문정보의 array 안의 totalPrice값을 모두 더해, 모든 주문들의 총 값을 계산 후 표시
        console.log(orderList);
        orderCount.innerText = orderList.length;
        let totalOrderPrice = 0;

        orderList.forEach((item) => {
            totalOrderPrice += item.totalPrice;
        });
        //reduce를 통해 좀더 깔끔하게 구현해보자.
        //총 가격에 useful-functions의 addCommas함수 적용
        orderTotalPrice.innerText = addCommas(totalOrderPrice);
    } catch (err) {
        console.error(err.stack);
    }
}

myPageView();
