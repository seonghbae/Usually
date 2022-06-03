import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';

const userTierName = document.getElementById('user-tier-name');
const userTierIcon = document.getElementById('user-tier-icon');
const totalUsedPrice = document.getElementById('total-used');
const nextGrade = document.getElementById('next-grade');
const prepareOrderCount = document.getElementById(
    'my-page-prepare-order-count'
);

const doneOrderCount = document.getElementById('my-page-delivered-order-count');
const shipOrderCount = document.getElementById('my-page-ship-order-count');

async function userTierRender() {
    let currentTier;
    try {
        let totalPrice = 0;
        const purchaseList = await Api.get('/order', 'shippedlist');
        if (!purchaseList) {
            throw new Error('회원 이름을 불러오는 것에 실패했습니다.');
        }
        purchaseList.forEach((singlePurchase) => {
            totalPrice += singlePurchase.totalPrice;
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

    try {
        const purchasedList = await Api.get('/order', 'shippedlist');
        if (!purchasedList) {
            throw new Error('회원 구매정보를 불러오는 것에 실패했습니다');
        }

        let totalUsed = purchasedList.reduce(
            (prev, curr) => prev + curr.totalPrice,
            0
        );
        totalUsedPrice.innerText = addCommas(totalUsed);
        if (currentTier === '브론즈') {
            nextGrade.innerText = addCommas(50000 - totalUsed);
        } else if (currentTier === '골드') {
            nextGrade.innerText = addCommas(1000000 - totalUsed);
        } else if (currentTier === '사파이어') {
            nextGrade.innerText = '최고 등급입니다';
        }
    } catch (err) {
        console.error(err.stack);
    }
}

async function myPageView() {
    try {
        const orderList = await Api.get('/order', 'list');
        if (!orderList) {
            throw new Error('회원 주문정보를 불러오는 것에 실패했습니다');
        }
        let prepareOrder = 0;
        let shipOrder = 0;
        let doneOrder = 0;
        orderList.forEach((singleOrder) => {
            if (singleOrder.status === '상품준비중') {
                prepareOrder++;
            } else if (singleOrder.status === '배송중') {
                shipOrder++;
            } else {
                doneOrder++;
            }
        });
        prepareOrderCount.innerText = prepareOrder;
        shipOrderCount.innerText = shipOrder;
        doneOrderCount.innerText = doneOrder;
    } catch (err) {
        console.error(err.stack);
    }
}

userTierRender();

myPageView();
