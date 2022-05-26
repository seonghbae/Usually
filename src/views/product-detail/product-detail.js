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

const datas = [ {
    shortId: '1',
    src: '/ring.jpg',
    madeBy: 'company',
    name: 'The Loop',
    description: "The Loop ring made by company",
    price: 20000,
}, {
    shortId: '2',
    src: '/necklace.jpg',
    madeBy: 'company',
    name: 'The Cross',
    description: "The Cross necklace made by company",
    price: 22000,
} ];

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

function addToInventory() {
    const productId = location.pathname.split("/")[2];
    const data = datas[productId-1];

    localStorage.setItem(data.shortId, JSON.stringify(data));
}

// 상품 상세
async function showProductDetail() {
    const productId = location.pathname.split("/")[2];
    const data = datas[productId-1];

    image.src = data.src;
    madeBy.innerHTML = data.madeBy;
    name.innerHTML = data.name;
    price.innerHTML = addCommas(data.price) + '원';
    description.innerHTML = data.description;
}