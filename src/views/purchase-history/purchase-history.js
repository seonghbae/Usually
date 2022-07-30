import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';
const tableContent = document.getElementById('table-content');
const userTierName = document.getElementById('user-tier-name');
const userTierIcon = document.getElementById('user-tier-icon');
async function renderOrder() {
    let currentTier;
    try {
        let totalPrice = 0;
        const purchasedList = await Api.get('/order', 'shippedlist');
        if (!purchasedList) {
            throw new Error('회원 주문정보를 불러오는 것에 실패했습니다');
        }
        purchasedList.forEach((purchasedOrder) => {
            totalPrice += purchasedOrder.totalPrice;
            for (let i = 0; i < purchasedOrder.orderedProducts.length; i++) {
                let purchasedOrderInfo = document.createElement('tr');
                purchasedOrderInfo.innerHTML += `
            <th>
                <div class="single-purchased-product" style="display:flex">
                    <img src="${
                        purchasedOrder.orderedProducts[i].productId.src
                    }" width="100"height="100">
                    
                    <div class="single-purchased-product-info">
                        <p>${
                            purchasedOrder.orderedProducts[i].productId.madeBy
                        }</p>
                        <p>${
                            purchasedOrder.orderedProducts[i].productId.name
                        }</p>
                    </div>
                </div>
            </th>
            <th>
                <div class="address">
                    
                    <p style="margin-top:12px;">${
                        purchasedOrder.address.postalCode
                    }</p>
                    <p>${purchasedOrder.address.address1}</p>
                </div>
            </th>
            <th>
                <p style="margin-top:25px;">${
                    purchasedOrder.orderedProducts[i].quantity
                }개</p>
            </th>
            <th>
                <p style="margin-top:25px;">${addCommas(
                    purchasedOrder.orderedProducts[i].quantity *
                        purchasedOrder.orderedProducts[i].productId.price
                )}원</p>
            </th>
            `;
                tableContent.appendChild(purchasedOrderInfo);
            }
        });
        if (totalPrice <= 50000) {
            userTierIcon.innerHTML = `
                <img src="/bronze-icon.png" width="60" height="90">
            `;
            currentTier = '브론즈';
        } else if (totalPrice > 50000 && totalPrice <= 1000000) {
            userTierIcon.innerHTML = `
                <img src="/gold-icon.png" width="60" height="90">
            `;
            currentTier = '골드';
        } else if (totalPrice > 1000000) {
            userTierIcon.innerHTML = `
                <img src="/sapphire-icon.png" width="90" height="90">
            `;
            currentTier = '사파이어';
        }
    } catch (err) {
        console.error(err.stack);
    }

    try {
        const userInfo = await Api.get('/users', 'userInfo');
        if (!userInfo) {
            throw new Error('회원 이름을 불러오는 것에 실패했습니다.');
        }
        userTierName.innerHTML += `
            <p id="userInfoField">${currentTier}</p>
            <p id="userNameField">${userInfo.name}님의 등급</p>
            
        `;
    } catch (err) {
        console.error(err.stack);
    }
}
renderOrder();
