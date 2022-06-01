import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const image = document.querySelector('#image');
const madeBy = document.querySelector('#madeBy');
const name = document.querySelector('#name');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const inventoryButton = document.querySelector('#inventory-button');
const purchaseButton = document.querySelector('#purchase-button');
const reviewContainer = document.querySelector('#review-container');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    showProductDetail();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    inventoryButton.addEventListener('click', addToInventory);
    purchaseButton.addEventListener('click', purchaseCallback);
}

// 장바구니 클릭시 localStorage에 항목 저장
async function addToInventory() {
    const productId = location.pathname.split("/")[2];

    try {
        const data = await Api.get('/productInfo', productId);
        localStorage.setItem(data.productId, JSON.stringify(data));
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 선택 상품 아이디 배열 저장, 이동
function purchaseCallback() {
    localStorage.setItem('productIds', JSON.stringify([ location.pathname.split("/")[2] ]));
    location.href = '/payment';
}

// 상품 상세
async function showProductDetail() {
    // /product/:productId 형식이라 split으로 productId만 가져오기
    const productId = location.pathname.split("/")[2];
    
    try {
        // api로 데이터를 받아옴
        const product = await Api.get('/productInfo', productId);
        image.src = product.src;
        madeBy.innerHTML = product.madeBy;
        name.innerHTML = product.name;
        price.innerHTML = addCommas(product.price) + '원';
        description.innerHTML = product.description;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 리뷰
async function showReviews() {
    try {
        const reviews = '';
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}