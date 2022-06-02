import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';
const tableContent = document.getElementById('table-content');
async function renderOrder() {
    try {
        let idBox = [];
        const orderList = await Api.get('/admin', 'orderlist');
        if (!orderList) {
            throw new Error('회원 주문정보를 불러오는 것에 실패했습니다');
        }
        orderList.forEach((singleOrder) => {
            let singleOrderInfo = document.createElement('tr');
            let singleOrderProducts = '';
            for (let i = 0; i < singleOrder.orderedProducts.length; i++) {
                singleOrderProducts += `
                    <div class="dropdown-item">
                        <img src="${singleOrder.orderedProducts[i].productId.src}", height="50", width="50">
                        <p>${singleOrder.orderedProducts[i].productId.name}</p>
                    </div>`;
            }
            singleOrderInfo.innerHTML += `
            <th>
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>제품 정보</span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        ${singleOrderProducts}
                    </div>
                </div>
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
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item">
                            <button id="${
                                singleOrder.shortId
                            }-ready">상품준비중</button>
                        </div>
                        <hr class="dropdown-divider">
                        <div class="dropdown-item">
                            <button id="${
                                singleOrder.shortId
                            }-ship">배송중</button>
                        </div>
                        <hr class="dropdown-divider">
                        <div class="dropdown-item">
                            <button id="${
                                singleOrder.shortId
                            }-done">배송완료</button>
                        </div>
                    </div>
                </div>
            </div>
            </th>
            <th>
            <button class="button is-danger" style="background: #ff9690" id="${
                singleOrder.shortId
            }">삭제하기</button>
            </th>
            `;
            idBox.push(singleOrder.shortId);

            tableContent.appendChild(singleOrderInfo);
        });
        let surplusSpace = document.createElement('tr');
        surplusSpace.innerHTML = `
        <th><div></div></th>
        <th><div></div></th>
        <th><div style="height:50vh"></div></th>
        <th><div></div></th>
        <th><div></div></th>
        <th><div></div></th>
                `;
        tableContent.appendChild(surplusSpace);

        for (let i = 0; i < idBox.length; i++) {
            let deleteButton = document.getElementById(idBox[i]);
            let readyButton = document.getElementById(idBox[i] + '-ready');
            let shipButton = document.getElementById(idBox[i] + '-ship');
            let doneButton = document.getElementById(idBox[i] + '-done');

            deleteButton.addEventListener('click', async function () {
                try {
                    const apiurl = '/order/cancel/' + idBox[i];
                    await fetch(apiurl, { method: 'DELETE' });
                    alert('주문삭제 성공!');
                    window.location.href = '/admin-order';
                } catch (err) {
                    console.Error(err.stack);
                }
            });
            readyButton.addEventListener('click', async function () {
                try {
                    Api.patch('/order', idBox[i], { status: '상품준비중' });
                    alert('변경 성공!');
                    window.location.href = '/admin-order';
                } catch (err) {
                    console.Error(err.message);
                }
            });
            shipButton.addEventListener('click', async function () {
                try {
                    Api.patch('/order', idBox[i], { status: '배송중' });
                    alert('변경 성공!');
                    window.location.href = '/admin-order';
                } catch (err) {
                    console.Error(err.message);
                }
            });
            doneButton.addEventListener('click', async function () {
                try {
                    Api.patch('/order', idBox[i], { status: '배송완료' });
                    alert('변경 성공!');
                    window.location.href = '/admin-order';
                } catch (err) {
                    console.Error(err.message);
                }
            });
        }
    } catch (err) {
        console.error(err.stack);
    }
}
renderOrder();
