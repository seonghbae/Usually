import * as Api from '/api.js';
import { addCommas, convertToNumber } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const cartProductsContainer = document.querySelector('#cart-products-container');
const selectAllCheckbox = document.querySelector('#select-all-checkbox');
const deleteChecked = document.querySelector('#delete-checked');
const purchaseButton = document.querySelector('#purchase-button');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    // addToInventory();
    showCartList();
    showOrder();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    selectAllCheckbox.addEventListener('change', changeAllCheckbox);
    deleteChecked.addEventListener('click', deleteSelectedProducts);
    // purchaseButton.addEventListener('click', );
}

// 모든 체크박스 전체 선택/해제 기능
function changeAllCheckbox() {
    const checkboxes = document.querySelectorAll('.product-checkbox');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    showOrder();
}

// 해당 체크박스 선택 해제에 따라 전체 선택 체크박스 변경
function changeSelectAllCheckbox() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const checked = document.querySelectorAll('.product-checkbox:checked');

    if(checkboxes.length === checked.length) {
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.checked = false;
    }
    showOrder();
}

// 선택 상품들 장바구니에서 삭제
function deleteSelectedProducts() {
    const checked = document.querySelectorAll('.product-checkbox:checked');
    checked.forEach((item) => {
        const id = item.parentNode.parentNode.id;
        const productItem = document.querySelector(`#${id}`);
        productItem.remove();
        localStorage.removeItem(id);
    });
}

// 해당 상품 장바구니에서 삭제
function deleteProduct(id) {
    const productItem = document.querySelector(`#${id}`);
    productItem.remove();
    localStorage.removeItem(id);
}

// 장바구니 상품 수량 변경
function changeQuantity(type, id) {
    const plusButton = document.querySelector(`#plus-${id}`);
    const minusButton = document.querySelector(`#minus-${id}`);
    const input = document.querySelector(`#input-${id}`);
    let inputValue = Number(input.value);
    
    if(type === 'plus') {
        if(minusButton.disabled) {
            minusButton.disabled = false;
        }
        inputValue += 1;
        if(inputValue === 99) {
            plusButton.disabled = true;
        }
    } else if(type === 'minus') {
        if(plusButton.disabled) {
            plusButton.disabled = false;
        }
        inputValue -= 1;
        if(inputValue === 1) {
            minusButton.disabled = true;
        }
    }

    input.value = inputValue;
    applyQuantity(id);
}

// 수량 변경 시 가격 반영
function applyQuantity(id) {
    const unitPrice = document.querySelector(`#unit-price-${id}`);
    const quantity = document.querySelector(`#quantity-${id}`);
    const total = document.querySelector(`#total-${id}`);
    const input = document.querySelector(`#input-${id}`);

    quantity.innerHTML = input.value;
    total.innerHTML = `${addCommas(convertToNumber(unitPrice.innerHTML) * Number(quantity.innerHTML))}원`;

    showOrder();
}

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 임시데이터 추가용
async function addToInventory() {
    try {
        const data1 = await Api.get('/productInfo', '29c500');
        const data2 = await Api.get('/productInfo', '6a980a');
        const data3 = await Api.get('/productInfo', '604b1d');
        localStorage.setItem(data1.productId, JSON.stringify(data1));
        localStorage.setItem(data2.productId, JSON.stringify(data2));
        localStorage.setItem(data3.productId, JSON.stringify(data3));
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 장바구니 목록
function showCartList() {
    

    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        items.push(item);
    }

    items.forEach((item) => {
        const checkbox = document.createElement('label');
        checkbox.className = 'checkbox';
        checkbox.innerHTML = `<input type="checkbox" class="product-checkbox" checked>`;
        checkbox.addEventListener('change', changeSelectAllCheckbox);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = 
        `<span class="icon">
            <i class="fas fa-trash-can" aria-hidden="true"></i>
        </span>`;
        deleteButton.addEventListener('click', () => deleteProduct(item.productId));
        
        const image = document.createElement('figure');
        image.className = 'image is-96x96';
        image.innerHTML = `<img src="${item.src}" alt="${item.name}">`;
        image.addEventListener('click', () => {});

        const minusButton = document.createElement('button');
        minusButton.className = 'button is-rounded';
        minusButton.setAttribute('id', `minus-${item.productId}`);
        minusButton.setAttribute('disabled', true);
        minusButton.innerHTML = 
        `<span class="icon is-small">
            <i class="fas fa-thin fa-minus" aria-hidden="true"></i>
        </span>`;
        minusButton.addEventListener('click', () => changeQuantity('minus', item.productId));

        const input = document.createElement('input');
        input.className = 'input';
        input.setAttribute('id', `input-${item.productId}`);
        input.setAttribute('type', 'number');
        input.setAttribute('min', '1');
        input.setAttribute('max', '99');
        input.setAttribute('value', '1');
        input.addEventListener('change', () => applyQuantity(item.productId));

        const plusButton = document.createElement('button');
        plusButton.className = 'button is-rounded';
        plusButton.setAttribute('id', `plus-${item.productId}`);
        minusButton.setAttribute('disabled', false);
        plusButton.innerHTML = 
        `<span class="icon is-small">
            <i class="fas fa-lg fa-plus" aria-hidden="true"></i>
        </span>`;
        plusButton.addEventListener('click', () => changeQuantity('plus', item.productId));

        const quantity = document.createElement('div');
        quantity.className = 'quantity';
        quantity.appendChild(minusButton);
        quantity.appendChild(input);
        quantity.appendChild(plusButton);

        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = `<p>${item.name}</p>`;
        content.appendChild(quantity);

        const calculation = document.createElement('div');
        calculation.className = 'calculation';
        calculation.innerHTML = 
        `<p id="unit-price-${item.productId}">${addCommas(item.price)}원</p>
        <p>
            <span class="icon">
                <i class="fas fa-thin fa-xmark" aria-hidden="true"></i>
            </span>
        </p>
        <p id="quantity-${item.productId}">${input.value}</p>
        <p>
            <span class="icon">
                <i class="fas fa-thin fa-equals" aria-hidden="true"></i>
            </span>
        </p>
        <p id="total-${item.productId}">${addCommas(Number(item.price) * Number(input.value))}원</p>`;

        const productItem = document.createElement('div');
        productItem.className = 'cart-product-item';
        productItem.setAttribute('id', item.productId);

        productItem.appendChild(checkbox);
        productItem.appendChild(deleteButton);
        productItem.appendChild(image);
        productItem.appendChild(content);
        productItem.appendChild(calculation);

        cartProductsContainer.appendChild(productItem);
    });
}

// 결재 관련 정보
function showOrder() {
    const checked = document.querySelectorAll('.product-checkbox:checked');
    const productCounts = document.querySelector('#product-counts');
    const productsTotal = document.querySelector('#products-total');
    const deliveryFee = document.querySelector('#delivery-fee');
    const totalPrice = document.querySelector('#total-price');

    let quantity = 0; 
    let total = 0;
    let delivery = 0;
    checked.forEach((item) => {
        const id = item.parentNode.parentNode.id;
        const itemQuantity = document.querySelector(`#quantity-${id}`);
        const itemTotal = document.querySelector(`#total-${id}`);
        quantity += Number(itemQuantity.innerHTML);
        total += convertToNumber(itemTotal.innerHTML);
    });

    if(total > 0 && total < 500000) {
        delivery = 3000;
    }

    productCounts.innerHTML = `${quantity}개`;
    productsTotal.innerHTML = `${addCommas(total)}원`;
    deliveryFee.innerHTML = `${addCommas(delivery)}원`;
    totalPrice.innerHTML = `${addCommas(total + delivery)}원`;
}