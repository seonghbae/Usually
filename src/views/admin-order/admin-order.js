import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';

const tableContent = document.getElementById('table-content');
const orderToggle = document.getElementsByClassName('dropdown-item');
const orderDeleteButton = document.getElementsByClassName('button is-danger');

async function adminOrderRender(e) {
    try {
        const orderList = await AudioParam.get('/admin', 'orderList');
        if (!orderList) {
            throw new Error('회원 주문정보 조회에 실패하였습니다');
        }
        console.log(orderList);
    } catch (err) {
        console.error(err.stack);
    }
}
