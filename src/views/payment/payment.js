import * as Api from '/api.js';
import { convertToNumber } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const nameElem = document.querySelector('#receiver-name');
const phoneNumberElem = document.querySelector('#receiver-phone-number');
const postalCodeElem = document.querySelector('#postal-code');
const address1Elem = document.querySelector('#address1');
const address2Elem = document.querySelector('#address2');
const customRequestContainer = document.querySelector(
    '#custom-request-container'
);
const customRequest = document.querySelector('#custom-request');
const productInfoElem = document.querySelector('#product-info');
const productsTotalElem = document.querySelector('#products-total');
const deliveryFeeElem = document.querySelector('#delivery-fee');
const totalPriceElem = document.querySelector('#total-price');

const searchAddressButton = document.querySelector('#search-address-button');
const requestSelectBox = document.querySelector('#request-select-box');
const paymentButton = document.querySelector('#payment-button');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    showPaymentInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    searchAddressButton.addEventListener('click', addressCallback);
    requestSelectBox.addEventListener('change', selectCustomRequest);
    paymentButton.addEventListener('click', paymentCallback);
}

// 주소 찾기
function addressCallback() {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = '';

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            postalCodeElem.value = data.zonecode;
            address1Elem.value = addr;

            address2Elem.placeholder = '상세 주소를 입력해 주세요.';
            address2Elem.focus();
        },
    }).open();
}

// 요청사항 직접입력 선택시 입력창 띄움
function selectCustomRequest() {
    const selectedOption =
        requestSelectBox.options[requestSelectBox.selectedIndex].value;
    if (selectedOption === '6') {
        customRequestContainer.style.display = 'block';
        customRequest.focus();
    } else {
        customRequestContainer.style.display = 'none';
    }
}

function addDashes(phoneNumber) {
    if (phoneNumber.length === 10) {
        return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
            3,
            6
        )}-${phoneNumber.substring(6)}`;
    } else if (phoneNumber.length === 11) {
        return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
            3,
            7
        )}-${phoneNumber.substring(7)}`;
    }
    return false;
}

// 배송지정보 입력 확인
// 결제하기 버튼 클릭시 order 정보를 DB에 보내고 페이지 이동
async function paymentCallback() {
    if (nameElem.value === '') {
        alert('이름을 입력해 주세요.');
    } else if (phoneNumberElem.value === '') {
        alert('전화번호를 입력해 주세요.');
    } else if (postalCodeElem.value === '' || address1Elem.value === '') {
        alert('주소를 입력해 주세요.');
    } else if (address2Elem.value === '') {
        alert('상세 주소를 입력해 주세요.');
    } else {
        alert('결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.');
        try {
            const orderInfo = JSON.parse(localStorage.getItem('order'));
            const selectedOption =
                requestSelectBox.options[requestSelectBox.selectedIndex];
            let message = selectedOption.innerHTML;
            if (selectedOption.value === '0') {
                message = '';
            } else if (selectedOption.value === '6') {
                message = customRequest.value;
            }
            const orderedProducts = orderInfo.productInfos.map(
                ({ productId, quantity }) => ({
                    productId: JSON.parse(localStorage.getItem(productId))._id,
                    quantity: Number(quantity),
                })
            );
            const order = {
                phoneNumber: addDashes(phoneNumberElem.value),
                address: {
                    postalCode: postalCodeElem.value,
                    address1: address1Elem.value,
                    address2: address2Elem.value,
                },
                message: message,
                orderedProducts: orderedProducts,
                totalPrice: convertToNumber(orderInfo.totalPrice),
                totalQuantity: convertToNumber(orderInfo.productCounts),
            };

            await Api.post('/order/purchase', order);
            orderInfo.productInfos.forEach((productInfo) => {
                localStorage.removeItem(productInfo.productId);
            });
            localStorage.removeItem('order');
            window.location.href = '/order-complete';
        } catch (err) {
            console.error(err.stack);
            alert(
                `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
            );
        }
    }
}

// 결제정보
function showPaymentInfo() {
    const order = JSON.parse(localStorage.getItem('order'));
    const productInfos = [];
    order.productInfos.forEach((productInfo) => {
        const product = JSON.parse(localStorage.getItem(productInfo.productId));
        productInfos.push(`${product.name} / ${productInfo.quantity}개`);
    });
    productInfoElem.innerHTML = productInfos.join('<br>');
    productsTotalElem.innerHTML = order.productsTotal;
    deliveryFeeElem.innerHTML = order.deliveryFee;
    totalPriceElem.innerHTML = order.totalPrice;
}
