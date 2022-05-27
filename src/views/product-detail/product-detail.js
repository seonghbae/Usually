import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const image = document.querySelector('#image');
const madeBy = document.querySelector('#madeBy');
const name = document.querySelector('#name');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const inventoryButton = document.querySelector('#inventoryButton');
const buyButton = document.querySelector('#buyButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    showProductDetail();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    inventoryButton.addEventListener('click', addToInventory);
}

// 장바구니 클릭시 localStorage에 항목 저장
async function addToInventory() {
    const productId = location.pathname.split("/")[2];

    try {
        const data = await Api.get('/product', productId);
        localStorage.setItem(data.productId, JSON.stringify(data));
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 상품 상세
async function showProductDetail() {
    // /product/:productId 형식이라 split으로 productId만 가져오기
    const productId = location.pathname.split("/")[2];
    
    try {
        // api로 데이터를 받아옴
        const data = await Api.get('/product', productId);
        image.src = data.src;
        madeBy.innerHTML = data.madeBy;
        name.innerHTML = data.name;
        price.innerHTML = addCommas(data.price) + '원';
        description.innerHTML = data.description;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}