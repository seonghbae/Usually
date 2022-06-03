import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';

const userCount = document.getElementById('admin-page-total-user');
const orderCount = document.getElementById('admin-page-total-order');
const bestSellerProduct = document.getElementById('admin-page-bestseller');
const needStock = document.getElementById('admin-page-need-stock');

async function adminMainContentRender() {
    adminMainUserCount();
    adminMainOrderCount();
    adminMainBestSeller();
    adminMainNeedStock();
}

async function adminMainUserCount() {
    try {
        const totalUser = await Api.get('/admin', 'userlist');
        if (!totalUser) {
            throw new Error('주문정보를 불러오는 것에 실패하였습니다');
        }
        userCount.innerText = totalUser.length + '명';
    } catch (err) {
        console.error(err.stack);
    }
}

async function adminMainOrderCount() {
    try {
        const totalOrder = await Api.get('/admin', 'orderlist');
        if (!totalOrder) {
            throw new Error('주문정보를 불러오는 것에 실패하였습니다');
        }
        orderCount.innerText = totalOrder.length + '회';
    } catch (err) {
        console.error(err.stack);
    }
}

async function adminMainBestSeller() {
    try {
        const allProducts = await Api.get('/admin', 'product');
        if (!allProducts) {
            throw new Error('제품정보를 불러오는 것에 실패하였습니다');
        }
        let bestSellerItem = allProducts[0];
        allProducts.forEach((singleProduct) => {
            if (singleProduct.sellCount > bestSellerItem.sellCount) {
                bestSellerItem = singleProduct;
            }
        });
        bestSellerProduct.innerText = `${bestSellerItem.name},
        ${bestSellerItem.sellCount}회
        `;
    } catch (err) {
        console.error(err.stack);
    }
}

async function adminMainNeedStock() {
    try {
        const allProducts = await Api.get('/admin', 'product');
        if (!allProducts) {
            throw new Error('제품정보를 불러오는 것에 실패하였습니다');
        }
        const needStockProducts = await allProducts.filter(
            (singleProduct) => singleProduct.inventory < 5
        );
        needStock.innerText = needStockProducts.length + '개';
    } catch (err) {
        console.error(err.stack);
    }
}
adminMainContentRender();
