import * as Api from '/api.js';
import { addCommas, convertToNumber } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const nameElem = document.querySelector('#receiver-name');
const phoneNumberElem = document.querySelector('#receiver-phone-number');
const postalCodeElem = document.querySelector('#postal-code');
const address1Elem = document.querySelector('#address1');
const address2Elem = document.querySelector('#address2');
const customRequestContainer = document.querySelector('#custom-request-container');
const productTitleElem = document.querySelector('#product-title');
const productsTotalElem = document.querySelector('#products-total');
const deliveryFeeElem = document.querySelector('#delivery-fee');
const totalPriceElem = document.querySelector('#total-price');

const searchAddressButton = document.querySelector('#search-address-button');
const requestSelectBox = document.querySelector('#request-select-box');;
const paymentButton = document.querySelector('#payment-button');


addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

function addressCallback() {}

function requestCallback() {}

function showDeliveryInfo() {}

function showPaymentInfo() {}