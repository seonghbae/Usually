import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const cartProductsContainer = document.querySelector('#cartProductsContainer');
const selectAllCheckbox = document.querySelector('#selectAllCheckbox');

const purchaseButton = document.querySelector('#purchaseButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    // showCartList();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    selectAllCheckbox.addEventListener('change', checkAll);
}

function checkAll() {
    const checkboxes = document.querySelectorAll('.productCheckbox');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

