import { addCommas } from '/useful-functions.js';
import * as Api from '/api.js';

// main 내 nav 버튼 클릭시 상품 나열
// 요소(element), input 혹은 상수
const categoryProductItemContainer = document.querySelector('.main-category');
const ageProductItemContainer = document.querySelector('.main-age');
// main 내 nav버튼 노드들
const categoryMenus = document.querySelectorAll('.main-navmenu-category')
const ageMenus = document.querySelectorAll('.main-navmenu-age')

addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() { 
    addProductInfo('name', categoryMenus, categoryProductItemContainer);
    addProductInfo('recommendAge', ageMenus, ageProductItemContainer);
}

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 상품 목록을 받아와 html을 뿌려주는 함수
async function showProductList(type, name, productItemContainer) {
    let datas = await getTargetData(type, name);
    productItemContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const productItem = document.createElement('div');
        productItem.classList.add('main-product-container');
        productItem.innerHTML = `
                <div class="main-product-image-container">
                    <img class="main-product-image" src="${datas[i].src}" alt="">
                </div>
                <div class="main-product-name">
                    ${datas[i].name}
                </div>
                <div class="main-product-price">
                    ${addCommas(datas[i].price)+'원'}
                </div>
        `;
        // 상품 클릭시 해당 상품 상세 페이지로 이동
        productItem.addEventListener('click', () => newPage(datas[i].productId));
        // 오류 코드
        // productItem.innerHTML = `
        // <div class="main-product-image-container">
        //     <img class="main-product-image" src="${datas[i].src}" alt="" onclick="newPage(data.shortId)">
        // </div>
        // <div class="main-product-name" onclick="${newPage(datas[i].productId)}">
        //     ${datas[i].name}
        // </div>
        // <div class="main-product-price">
        //     ${addCommas(datas[i].price)+'원'}
        // </div>
        // `;
        productItemContainer.appendChild(productItem);
    }
}

// 선택한 type으로 target을 정해 데이터를 가져오는 함수
async function getTargetData(type, target){
    // result 3은 구현해달라고 말씀을 드려야 할 것 같음..
    const data = Api.get('/productInfo', type + '/' + target + '/');
    console.log(data);
    return data;
};

// main 메뉴 버튼을 클릭했을 때, html 요소들을 파싱해주는 함수.
async function addProductInfo(type, menus, productItemContainer){
    for (let i = 0; i < menus.length; i++){
        // 첫번째 버튼은 데이터를 바로 홈페이지에 뿌려준다.
        if (i == 0) {
            showProductList(type, menus[i].name, productItemContainer);
        }
        // 메뉴버튼을 클릭했을 때 작동하도록 버튼 각각마다 이벤트리스너 적용 및 서식 제어
        menus[i].addEventListener('click', (e) => {
            e.preventDefault();
            for (let j = 0; j < menus.length; j++){
                menus[j].classList.remove('main-navmenu-clicked');
            }
            menus[i].classList.add('main-navmenu-clicked');
            showProductList(type, menus[i].name, productItemContainer);
        })
    }
}

