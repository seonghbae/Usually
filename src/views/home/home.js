import { addCommas } from '/useful-functions.js';

// 이미지 슬라이더 구현
let currentSlide = 1;
let nextTranslate = 0;
// 슬라이더와 버튼을 담고 있는 컨테이너
const container = document.querySelector('.slider-container')
// 슬라이더 전체
const slider = document.querySelector('.slider')
// 슬라이더 이미지 리스트
const slideList = document.querySelectorAll('.slider-image')
// 전체 버튼 리스트
const sliderButton = document.querySelectorAll('.slider-button')
// 넘버 버튼 리스트
const numberButtons = document.querySelectorAll('.slider-number-button');
numberButtons[0].style.background = '#ffae96';
let sliderLength = slideList.length;

// 넘버 버튼 각각마다 클릭 이벤트리스너 추가
for (let i = 0; i < sliderLength; i++){
    numberButtons[i].addEventListener('click', function(){
        numberButtons[currentSlide - 1].style.background = 'white';
        currentSlide = i+1;
        numberButtons[i].style.background = '#ffae96';
        slider.style.transform = `translate(-${i * 100}vw)`;
        slider.animate({
            opacity: [0.6, 1]
        }, {
            duration: 2000,
            easing: "ease",
            iterations: 1,
            fill: "both"
        });

    })
}

// 이전 이미지를 보여주는 함수
const slidePrev = function () {
    numberButtons[currentSlide - 1].style.background = 'white';
    currentSlide--
    if (currentSlide == 0){
        currentSlide = sliderLength;
    }
    numberButtons[currentSlide - 1].style.background = '#ffae96';
    nextTranslate = (currentSlide - 1) * 100 + 'vw';
    slider.style.transform = `translate(-${nextTranslate})`;
    slider.animate({
    opacity: [0.6, 1]
}, {
    duration: 2000,
    easing: "ease",
    iterations: 1,
    fill: "both"
});
}

// 다음 이미지를 보여주는 함수
const slideNext = function (){
    numberButtons[currentSlide - 1].style.background = 'white';
    currentSlide++
    if (currentSlide == sliderLength + 1){
        currentSlide = 1;
    }
    numberButtons[currentSlide - 1].style.background = '#ffae96';
    nextTranslate = (currentSlide - 1) * 100 + 'vw'; 
    slider.style.transform = `translate(-${nextTranslate})`;
    slider.animate({
        opacity: [0.6, 1]
    }, {
        duration: 2000,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });

}

// Interval 설정
let slideTimer = setInterval(slideNext, 5000);


// main 내 nav 버튼 클릭시 상품 나열
// 요소(element), input 혹은 상수
const categoryProductItemContainer = document.querySelector('.main-category');
const ageProductItemContainer = document.querySelector('.main-age');
// main 내 nav버튼 노드들
const categoryMenus = document.querySelectorAll('.main-navmenu-category')
const ageMenus = document.querySelectorAll('.main-navmenu-age')

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    addProductInfo(categoryMenus, categoryProductItemContainer);
    addProductInfo(ageMenus, ageProductItemContainer);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    // 슬라이더 왼쪽, 오른쪽 버튼 리스너
    document.querySelector('.slider-prev-button').addEventListener('click', slidePrev);
    document.querySelector('.slider-next-button').addEventListener('click', slideNext);
    // 컨테이너에 mouseenter/mouseleave 을 통한 Interval 설정, 버튼 opacity 설정
    container.addEventListener('mouseenter', function(){
        clearInterval(slideTimer);
        sliderButton.forEach((e)=>{
        e.style.opacity = 1;
        })
    })

    container.addEventListener('mouseleave', function(){
        slideTimer = setInterval(slideNext, 5000);
        sliderButton.forEach((e)=>{
        e.style.opacity = 0;
        })
    })
}

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 상품 목록을 받아와 html을 뿌려주는 함수
async function showProductList(productItemContainer) {
    // 테스트 데이터
    const data = {
        shortId: '1',
        img: '/bracelet8.jpg',
        madeBy: 'company',
        name: 'The Loop',
        price: 20000,
    };

    const datas = [];
    for (let i = 0; i < 3; i++) datas.push(data);
    productItemContainer.innerHTML = '';
    datas.forEach((data, index, array) =>{
        const productItem = document.createElement('div');
        productItem.classList.add('main-product-container');
        productItem.innerHTML = `
                <div class="main-product-image-container">
                    <img class="main-product-image" src="${data.img}" alt="">
                </div>
                <div class="main-product-name">
                    ${data.name}
                </div>
                <div class="main-product-price">
                    ${addCommas(data.price)+'원'}
                </div>
        `;
        // 상품 클릭시 해당 상품 상세 페이지로 이동
        productItem.addEventListener('click', () => newPage(data.shortId));
        productItemContainer.appendChild(productItem);
    })
    
}
async function addProductInfo(menus, productItemContainer){
    for (let i = 0; i < menus.length; i++){
        menus[i].addEventListener('click', (e) => {
            e.preventDefault();
            for (let j = 0; j < menus.length; j++){
                menus[j].classList.remove('main-navmenu-clicked');
            }
            menus[i].classList.add('main-navmenu-clicked');
            showProductList(productItemContainer);
        })
    }
}

