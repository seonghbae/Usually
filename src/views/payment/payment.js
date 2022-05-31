import * as Api from '/api.js';
import { addCommas, convertToNumber } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const nameElem = document.querySelector('#receiver-name');
const phoneNumberElem = document.querySelector('#receiver-phone-number');
const postalCodeElem = document.querySelector('#postal-code');
const address1Elem = document.querySelector('#address1');
const address2Elem = document.querySelector('#address2');
const customRequestContainer = document.querySelector('#custom-request-container');
const customRequest = document.querySelector('#custom-request');
const productInfoElem = document.querySelector('#product-info');
const productsTotalElem = document.querySelector('#products-total');
const deliveryFeeElem = document.querySelector('#delivery-fee');
const totalPriceElem = document.querySelector('#total-price');

const searchAddressButton = document.querySelector('#search-address-button');
const requestSelectBox = document.querySelector('#request-select-box');;
const paymentButton = document.querySelector('#payment-button');


addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    showDeliveryInfo();
    showPaymentInfo();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    searchAddressButton.addEventListener('click', addressCallback);
    requestSelectBox.addEventListener('change', selectCustomRequest);
}

// 주소 찾기
function addressCallback() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            let addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            postalCodeElem.value = data.zonecode;
            address1Elem.value = addr;
            // 커서를 상세주소 필드로 이동한다.
            address2Elem.placeholder = "상세 주소를 입력해 주세요."
            address2Elem.focus();
        }
    }).open();
}

// 요청사항 직접입력 선택시 입력창 띄움
function selectCustomRequest() {
    const selectedOption = requestSelectBox.options[requestSelectBox.selectedIndex].value;
    if(selectedOption === '6') {
        customRequestContainer.style.display = 'block';
        customRequest.focus();
    }
}

// 배송지정보 입력 확인
function checkDeliveryInfo() {
    
}

// 결제하기 버튼 클릭시 order 정보를 DB에 보내고 페이지 이동
function requestCallback() {}

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