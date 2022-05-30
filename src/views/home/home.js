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

// main 내 삽입될 데이터들
// 카테고리 기반 데이터
const categoryDatas = [
    // ring
    [
        {
            shortId: '209cde',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/ring02.jpg',
            name: '쓰리 스톤 포인트 로즈 골드 링',
            price: 29800,
        },

        {
            shortId: '988e5e',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/ring01.jpg',
            name: '슬래시 플래티늄 링',
            price: 50000,
        },

        {
            shortId: '3fa035',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/ring03.jpg',
            name: '발렌타인 플래티늄 링',
            price: 39800,
        },
    ],
    // necklace
    [
        {
            shortId: '99b2e4',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/necklace01.jpg',
            name: '다이아몬드 하트 목걸이',
            price: 50000,
        },

        {
            shortId: 'cc1c6a',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/necklace02.jpg',
            name: '실버 팬던트 목걸이',
            price: 198000,
        },

        {
            shortId: '19d37f',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/necklace03.jpg',
            name: '골드 팬던트 목걸이',
            price: 70000,
        },
    ],
    // earring
    [
        {
            shortId: '9ecf62',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring01.jpg',
            name: '18K 로즈 골드 물방울 귀걸이',
            price: 160000,
        },

        {
            shortId: '6c3183',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring02.jpg',
            name: '유광 골드 링형 귀걸이',
            price: 39000,
        },

        {
            shortId: '7986e2',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring03.jpg',
            name: '5부 다이아 귀걸이',
            price: 376000,
        },
    ],
    // bracelet
    [
        {
            shortId: 'b6ac92',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/bracelet02.jpg',
            name: '빈티지 무광 메탈 크로스 팔찌',
            price: 68000,
        },

        {
            shortId: '4dce9b',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/bracelet04.jpg',
            name: '골드 플라워 데코 팔찌',
            price: 118000,
        },

        {
            shortId: 'cc7f8f',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring07.jpg',
            name: '18K 사파이어 하프 체인 팔찌',
            price: 198000,
        },
    ],
    // watch
    [
        {
            shortId: '0cf63c',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/watch-10.jpg',
            name: 'Quartz 모던 손목시계',
            price: 370000,
        },

        {
            shortId: '8278df',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/watch-9.jpg',
            name: '알마니 아이언 시계',
            price: 75000,
        },

        {
            shortId: 'cc7f8f',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/watch-8.jpg',
            name: 'Qmax 프리미엄 시계',
            price: 2950000,
        },
    ],
];

// 나이 기반 데이터
const ageDatas = [
    // 10대
    [
        {
            shortId: '969de8',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/bracelet05.jpg',
            name: '14k Love 체인 팔찌',
            price: 78000,
        },

        {
            shortId: 'b58d49',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring04.jpg',
            name: '블루 하트 귀걸이',
            price: 8000,
        },

        {
            shortId: '94c9b2',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/watch-3.jpg',
            name: 'Nobrand 나뭇잎 손목시계',
            price: 350000,
        },
    ],
    // 20대
    [
        {
            shortId: '651852',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/necklace01.jpg',
            name: '핑크 베이직 가죽 팔찌',
            price: 38000,
        },

        {
            shortId: '9034b9',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring08.jpg',
            name: '팬던트 귀걸이',
            price: 138000,
        },

        {
            shortId: 'd69bf9',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/watch-5.jpg',
            name: 'Courtly 클래식 가죽시계',
            price: 1200000,
        },
    ],
    // 30대
    [
        {
            shortId: 'f9a648',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/necklace05.jpg',
            name: '팬던트 목걸이',
            price: 79000,
        },

        {
            shortId: '845899',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring07.jpg',
            name: '플래티넘 크리스탈 링 귀걸이',
            price: 199000,
        },

        {
            shortId: '7986e2',
            img: 'https://shopping13.s3.ap-northeast-2.amazonaws.com/earring03.jpg',
            name: '5부 다이아 귀걸이',
            price: 376000,
        },
    ],
];

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
    addProductInfo(categoryMenus, categoryDatas, categoryProductItemContainer);
    addProductInfo(ageMenus, ageDatas, ageProductItemContainer);
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
async function showProductList(datas, productItemContainer) {
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
        // 오류 코드
        // productItem.innerHTML = `
        // <div class="main-product-image-container">
        //     <img class="main-product-image" src="${data.img}" alt="" onclick="newPage(data.shortId)">
        // </div>
        // <div class="main-product-name" onclick="${newPage(data.shortId)}">
        //     ${data.name}
        // </div>
        // <div class="main-product-price">
        //     ${addCommas(data.price)+'원'}
        // </div>
        // `;
        productItemContainer.appendChild(productItem);
    })
    
}
// main 메뉴 버튼을 클릭했을 때, html 요소들을 파싱해주는 함수.
async function addProductInfo(menus, productDatas, productItemContainer){
    for (let i = 0; i < menus.length; i++){
        // 첫번째 버튼은 데이터를 바로 홈페이지에 뿌려준다.
        if (i == 0) {
            showProductList(productDatas[0], productItemContainer);
        }
        // 메뉴버튼을 클릭했을 때 작동하도록 버튼 각각마다 이벤트리스너 적용 및 서식 제어
        menus[i].addEventListener('click', (e) => {
            e.preventDefault();
            for (let j = 0; j < menus.length; j++){
                menus[j].classList.remove('main-navmenu-clicked');
            }
            menus[i].classList.add('main-navmenu-clicked');
            showProductList(productDatas[i], productItemContainer);
        })
    }
}

