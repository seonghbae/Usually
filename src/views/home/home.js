import { addCommas } from '/useful-functions.js';
import * as Api from '/api.js';

// main 내 nav 버튼 클릭시 상품 나열
// 요소(element), input 혹은 상수
const categoryProductItemContainer = document.querySelector('.main-category');
const ageProductItemContainer = document.querySelector('.main-age');
// main 내 nav버튼 노드들
const categoryMenus = document.querySelectorAll('.main-navmenu-category');
const ageMenus = document.querySelectorAll('.main-navmenu-age');

addAllElements();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() { 
    addProductInfo('name', categoryMenus, categoryProductItemContainer);
    addProductInfo('recommendAge', ageMenus, ageProductItemContainer);
};

// 상품 목록을 받아와 html을 뿌려주는 함수
async function showProductList(type, name, productItemContainer) {
    let datas = await getTargetData(type, name);
    productItemContainer.innerHTML = '';
    for (let i = 0; i < datas.length; i++) {
        const productItem = document.createElement('div');
        productItem.classList.add('main-product-container');
        productItem.innerHTML += `
        <div class="main-product-image-container"> 
            <a href="/product/${datas[i].productId}"><img class="main-product-image" src="${datas[i].src}" alt=""></a>
        </div>
        <div class="main-product-name">
            <a href="/product/${datas[i].productId}">${datas[i].name}</a>
        </div>
        <div class="main-product-price">
            ${addCommas(datas[i].price)+'원'}
        </div>
        `;
        productItemContainer.appendChild(productItem);
    };
};

// 선택한 type으로 target을 정해 데이터를 가져오는 함수
async function getTargetData(type, target){
    const data = Api.get('/productInfo', type + '/' + target + '/');
    return data;
};

// main 메뉴 버튼을 클릭했을 때, html 요소들을 파싱해주는 함수.
async function addProductInfo(type, menus, productItemContainer){
    for (let i = 0; i < menus.length; i++){
        // 첫번째 버튼은 데이터를 바로 홈페이지에 뿌려준다.
        if (i == 0) {
            showProductList(type, menus[i].name, productItemContainer);
        };
        // 메뉴버튼을 클릭했을 때 작동하도록 버튼 각각마다 이벤트리스너 적용 및 서식 제어
        menus[i].addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            for (let j = 0; j < menus.length; j++){
                menus[j].classList.remove('main-navmenu-clicked');
            };
            menus[i].classList.add('main-navmenu-clicked');
            showProductList(type, menus[i].name, productItemContainer);
            // main-slider가 0번째 이미지를 보여주도록 설정
            if (type == 'name'){
                inner.style.transition =  'none';
                inner.style.transform = `translate(-0vw)`;
                mainCurrentSlide = 0;
            };
            if (type == 'recommendAge') {
                bottomInner.style.transition =  'none';
                bottomInner.style.transform = `translate(-0vw)`;
                bottomMainCurrentSlide = 0;
            };
        });
    };
};
// main-slider
const inner = document.querySelector('.main-products-container');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const bottomInner = document.querySelector('.main-bottom-products-container');
const bottomLeftButton = document.querySelector('.bottom-left-button');
const bottomRightButton = document.querySelector('.bottom-right-button');
let mainCurrentSlide = 0;
let bottomMainCurrentSlide = 0;
leftButton.addEventListener('click', leftSwipe);
rightButton.addEventListener('click', rightSwipe);
bottomLeftButton.addEventListener('click', bottomLeftSwipe);
bottomRightButton.addEventListener('click', bottomRightSwipe);
inner.style.transition =  'transform 1s';
bottomInner.style.transition =  'transform 1s';
// 왼쪽 버튼 함수
function leftSwipe() {
    inner.style.transition =  'transform 1s';
    // 현재 가장 왼쪽이면 리턴
    if (inner.style.transform  === `translate(-0vw)`) {return};
    mainCurrentSlide = mainCurrentSlide - 3;
    // 0번째 슬라이드까지만 적용해줌
    if (mainCurrentSlide < 0){
        mainCurrentSlide = 0;
    };
    inner.style.transform  = `translate(-${mainCurrentSlide * 22}vw)`;
};
// 오른쪽 버튼 함수
function rightSwipe() {
    inner.style.transition =  'transform 1s';
    const sliderLength = inner.childElementCount;
    if (inner.style.transform  === `translate(-${sliderLength * 22}vw)`) {return};
    mainCurrentSlide = mainCurrentSlide + 3;
    if (mainCurrentSlide >= sliderLength-3){
        mainCurrentSlide = sliderLength-3;
    };
    inner.style.transform  = `translate(-${mainCurrentSlide * 22}vw)`;
};
//아래쪽 왼쪽버튼함수
function bottomLeftSwipe() {
    bottomInner.style.transition =  'transform 1s';
    if (bottomInner.style.transform  === `translate(-0vw)`) {return};
    bottomMainCurrentSlide = bottomMainCurrentSlide - 3;
    if (bottomMainCurrentSlide < 0){
        bottomMainCurrentSlide = 0;
    };
    bottomInner.style.transform  = `translate(-${bottomMainCurrentSlide * 22}vw)`;
};
//아래쪽 오른쪽 버튼 함수
function bottomRightSwipe() {
    bottomInner.style.transition =  'transform 1s';
    const sliderLength = bottomInner.childElementCount;
    if (bottomInner.style.transform  === `translate(-${sliderLength * 22}vw)`) {return};
    bottomMainCurrentSlide = bottomMainCurrentSlide + 3;
    if (bottomMainCurrentSlide >= sliderLength-3){
        bottomMainCurrentSlide = sliderLength-3;
    };
    bottomInner.style.transform  = `translate(-${bottomMainCurrentSlide * 22}vw)`;
};