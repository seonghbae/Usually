import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';

const tableContent = document.getElementById('table-content');
const orderToggle = document.getElementsByClassName('dropdown-item');
const orderDeleteButton = document.getElementsByClassName('button is-danger');

async function adminOrderRender(e) {
    try {
        const orderList = await Api.get('/admin', 'orderList');
        if (!orderList) {
            throw new Error('회원 주문정보 조회에 실패하였습니다');
        }
        console.log(orderList);
        orderList.forEach((singleOrder) => {
            let singleOrderInfo = document.createElement('tr');
            singleOrderInfo.innerHTML += `
            <th>
            <div>
            <img src="https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg" height="50" width="50">
            <p>이름: ${singleOrder.orderedProducts[0]}</p>
            </div>
        </th>
        <th>
            ${singleOrder.shortId}
        </th>
        <th>
            ${singleOrder.totalQuantity}개, 
            ${addCommas(singleOrder.totalPrice)}원
        </th>
        <th>
            ${singleOrder.address.address1},
            ${singleOrder.address.address2}
        </th>
        <th>
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>${singleOrder.status}</span>
                    </button>
                </div>
                <div class="dropdown-menu is-" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item">
                            <p>상품준비중</p>
                        </div>
                        <hr class="dropdown-divider">
                        <div class="dropdown-item">
                            <p>배송중</p>
                        </div>
                        <hr class="dropdown-divider">
                        <div class="dropdown-item">
                            <p>배송완료(선택 시 주문삭제)</p>
                        </div>
                    </div>
                </div>
            </div>
        </th>
        <th>
            <div>
                <button class="button is-danger" style="background: #ff9690">주문 삭제</button>
            </div>
        </th>
            `;
            tableContent.appendChild(singleOrderInfo);
        });
    } catch (err) {
        console.error(err.stack);
    }
}

adminOrderRender();
