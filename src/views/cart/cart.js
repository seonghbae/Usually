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
    selectAllCheckbox.addEventListener('change', changeAllCheckbox);
}

// 모든 체크박스 전체 선택/해제 기능
function changeAllCheckbox() {
    const checkboxes = document.querySelectorAll('.productCheckbox');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

// 해당 체크박스 선택 해제에 따라 전체 선택 체크박스 변경
function changeSelectAllCheckbox() {
    const checkboxes = document.querySelectorAll('.productCheckbox');
    const checked = document.querySelectorAll('.productCheckbox:checked');

    if(checkboxes.length === checked.length) {
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.checked = false;
    }
}

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 장바구니 목록
async function showCartList() {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = localStorage.getItem(key);
        items.push(item);
    }

    items.forEach((item) => {
        const productItem = document.createElement('div');

        const checkbox = document.createElement('label');
        checkbox.classList.add('checkbox');
        checkbox.innerHTML = `<input type="checkbox" checked>`;
        

        // <div class="cart-product-item" id="productItem1">
        //     <label class="checkbox">
        //         <input type="checkbox" checked>
        //     </label>
        //     <button class="delete-button">
        //         <span class="icon">
        //             <i class="fas fa-trash-can" aria-hidden="true"></i>
        //         </span>
        //     </button>
        //     <figure class="image is-96x96">
        //         <img src="/ring.jpg" alt="임시 메세지">
        //     </figure>
        //     <div class="content">
        //         <p>The Loop</p>
        //         <div class="quantity">
        //             <button class="button is-rounded">
        //                 <span class="icon is-small">
        //                     <i class="fas fa-thin fa-minus" aria-hidden="true"></i>
        //                 </span>
        //             </button>
        //             <input class="input" type="number" min="1" max="99" value="1">
        //             <button class="button is-rounded">
        //                 <span class="icon">
        //                     <i class="fas fa-lg fa-plus" aria-hidden="true"></i>
        //                 </span>
        //             </button>
        //         </div>
        //     </div>
        //     <div class="calculation">
        //         <p>34,000원</p>
        //         <p>
        //             <span class="icon">
        //                 <i class="fas fa-thin fa-xmark" aria-hidden="true"></i>
        //             </span>
        //         </p>
        //         <p>1</p>
        //         <p>
        //             <span class="icon">
        //                 <i class="fas fa-thin fa-equals" aria-hidden="true"></i>
        //             </span>
        //         </p>
        //         <p>34,000원</p>
        //     </div>
        // </div>
    });
}
