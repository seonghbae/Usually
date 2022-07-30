import * as Api from '/api.js';
import { addCommas, convertToNumber } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const cartProductsContainer = document.querySelector(
    '#cart-products-container'
);
const selectAllCheckbox = document.querySelector('#select-all-checkbox');
const deleteChecked = document.querySelector('#delete-checked');
const purchaseButton = document.querySelector('#purchase-button');
const userTierName = document.getElementById('user-tier-name');
const userTierIcon = document.getElementById('user-tier-icon');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    userTierRender();
    showCartList();
    showOrder();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    selectAllCheckbox.addEventListener('change', changeAllCheckbox);
    deleteChecked.addEventListener('click', deleteSelectedProducts);
    purchaseButton.addEventListener('click', purchaseCallback);
}

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

    if (checkboxes.length === checked.length) {
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.checked = false;
    }
    showOrder();
}

// 선택 상품들 장바구니에서 삭제
function deleteSelectedProducts() {
    const checked = document.querySelectorAll('.product-checkbox:checked');
    checked.forEach((product) => {
        const productId = product.parentNode.parentNode.id.split('-')[1];
        const productItem = document.querySelector(`#item-${productId}`);
        productItem.remove();
        localStorage.removeItem(productId);
    });
    showOrder();
}

// 해당 상품 장바구니에서 삭제
function deleteProduct(productId) {
    const productItem = document.querySelector(`#item-${productId}`);
    productItem.remove();
    localStorage.removeItem(productId);
    showOrder();
}

// 장바구니 상품 수량 변경
function changeQuantity(type, productId) {
    const plusButton = document.querySelector(`#plus-${productId}`);
    const minusButton = document.querySelector(`#minus-${productId}`);
    const input = document.querySelector(`#input-${productId}`);
    let inputValue = Number(input.value);

    if (type === 'plus') {
        if (minusButton.disabled) {
            minusButton.disabled = false;
        }
        inputValue += 1;
        if (inputValue === 99) {
            plusButton.disabled = true;
        }
    } else if (type === 'minus') {
        if (plusButton.disabled) {
            plusButton.disabled = false;
        }
        inputValue -= 1;
        if (inputValue === 1) {
            minusButton.disabled = true;
        }
    }

    input.value = inputValue;
    applyQuantity(productId);
}

// 수량 변경 시 가격 반영
function applyQuantity(productId) {
    const unitPrice = document.querySelector(`#unit-price-${productId}`);
    const quantity = document.querySelector(`#quantity-${productId}`);
    const total = document.querySelector(`#total-${productId}`);
    const input = document.querySelector(`#input-${productId}`);

    quantity.innerHTML = input.value;
    total.innerHTML = `${addCommas(
        convertToNumber(unitPrice.innerHTML) * Number(quantity.innerHTML)
    )}원`;

    showOrder();
}

// 입력으로 들어오는 상품 상세 페이지로 이동
function productPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 장바구니 목록
function showCartList() {
    const products = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.length !== 6 || /[^0-9a-z]/.test(key)) continue;
        const product = JSON.parse(localStorage.getItem(key));
        products.push(product);
    }

    products.forEach((product) => {
        const checkbox = document.createElement('label');
        checkbox.className = 'checkbox';
        checkbox.innerHTML = `<input type="checkbox" class="product-checkbox" checked>`;
        checkbox.addEventListener('change', changeSelectAllCheckbox);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = `<span class="icon">
            <i class="fas fa-trash-can" aria-hidden="true"></i>
        </span>`;
        deleteButton.addEventListener('click', () =>
            deleteProduct(product.productId)
        );

        const image = document.createElement('figure');
        image.className = 'image is-square';
        image.innerHTML = `<img src="${product.src}" alt="${product.name}">`;
        image.addEventListener('click', () => {
            productPage(product.productId);
        });

        const minusButton = document.createElement('button');
        minusButton.className = 'button is-rounded';
        minusButton.setAttribute('id', `minus-${product.productId}`);
        minusButton.setAttribute('disabled', true);
        minusButton.innerHTML = `<span class="icon is-small">
            <i class="fas fa-thin fa-minus" aria-hidden="true"></i>
        </span>`;
        minusButton.addEventListener('click', () =>
            changeQuantity('minus', product.productId)
        );

        const input = document.createElement('input');
        input.className = 'input';
        input.setAttribute('id', `input-${product.productId}`);
        input.setAttribute('type', 'number');
        input.setAttribute('min', '1');
        input.setAttribute('max', '99');
        input.setAttribute('value', '1');
        input.addEventListener('change', () =>
            applyQuantity(product.productId)
        );

        const plusButton = document.createElement('button');
        plusButton.className = 'button is-rounded';
        plusButton.setAttribute('id', `plus-${product.productId}`);
        minusButton.setAttribute('disabled', false);
        plusButton.innerHTML = `<span class="icon is-small">
            <i class="fas fa-lg fa-plus" aria-hidden="true"></i>
        </span>`;
        plusButton.addEventListener('click', () =>
            changeQuantity('plus', product.productId)
        );

        const quantity = document.createElement('div');
        quantity.className = 'quantity';
        quantity.appendChild(minusButton);
        quantity.appendChild(input);
        quantity.appendChild(plusButton);

        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = `<p>${product.name}</p>`;
        content.appendChild(quantity);

        const calculation = document.createElement('div');
        calculation.className = 'calculation';
        calculation.innerHTML = `<p id="unit-price-${
            product.productId
        }">${addCommas(Number(product.price))}원</p>
        <p>
            <span class="icon">
                <i class="fas fa-thin fa-xmark" aria-hidden="true"></i>
            </span>
        </p>
        <p id="quantity-${product.productId}">${input.value}</p>
        <p>
            <span class="icon">
                <i class="fas fa-thin fa-equals" aria-hidden="true"></i>
            </span>
        </p>
        <p id="total-${product.productId}">${addCommas(
            Number(product.price) * Number(input.value)
        )}원</p>`;

        const productItem = document.createElement('div');
        productItem.className = 'cart-product-item';
        productItem.setAttribute('id', `item-${product.productId}`);

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
    checked.forEach((product) => {
        const productId = product.parentNode.parentNode.id.split('-')[1];
        const itemQuantity = document.querySelector(`#quantity-${productId}`);
        const itemTotal = document.querySelector(`#total-${productId}`);
        quantity += Number(itemQuantity.innerHTML);
        total += convertToNumber(itemTotal.innerHTML);
    });

    // 500,000원 이상 구매시 배송비 무료
    if (total > 0 && total < 500000) {
        delivery = 3000;
    }

    productCounts.innerHTML = `${quantity}개`;
    productsTotal.innerHTML = `${addCommas(total)}원`;
    deliveryFee.innerHTML = `${addCommas(delivery)}원`;
    totalPrice.innerHTML = `${addCommas(total + delivery)}원`;
}

// 선택 상품 아이디 배열 저장, 이동
function purchaseCallback() {
    const checked = document.querySelectorAll('.product-checkbox:checked');
    const productCounts = document.querySelector('#product-counts');
    const productsTotal = document.querySelector('#products-total');
    const deliveryFee = document.querySelector('#delivery-fee');
    const totalPrice = document.querySelector('#total-price');

    const productInfos = [];
    checked.forEach((product) => {
        const productId = product.parentNode.parentNode.id.split('-')[1];
        productInfos.push({
            productId: productId,
            quantity: document.querySelector(`#input-${productId}`).value,
        });
    });
    const order = {
        productInfos: productInfos,
        productCounts: productCounts.innerHTML,
        productsTotal: productsTotal.innerHTML,
        deliveryFee: deliveryFee.innerHTML,
        totalPrice: totalPrice.innerHTML,
    };
    localStorage.setItem('order', JSON.stringify(order));

    location.href = '/payment';
}
