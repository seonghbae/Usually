// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';

// // 요소(element), input 혹은 상수
// const landingDiv = document.querySelector('#landingDiv');
// const greetingDiv = document.querySelector('#greetingDiv');

// addAllElements();
// addAllEvents();

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {
//   insertTextToLanding();
//   insertTextToGreeting();
// }

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// function addAllEvents() {
//   landingDiv.addEventListener('click', alertLandingText);
//   greetingDiv.addEventListener('click', alertGreetingText);
// }

// function insertTextToLanding() {
//   landingDiv.insertAdjacentHTML(
//     'beforeend',
//     `
//       <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
//     `
//   );
// }

// function insertTextToGreeting() {
//   greetingDiv.insertAdjacentHTML(
//     'beforeend',
//     `
//       <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
//     `
//   );
// }

// function alertLandingText() {
//   alert('n팀 쇼핑몰입니다. 안녕하세요.');
// }

// function alertGreetingText() {
//   alert('n팀 쇼핑몰에 오신 것을 환영합니다');
// }

// async function getDataFromApi() {
//   // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
//   const data = await Api.get('/api/user/data');
//   const random = randomId();

//   console.log({ data });
//   console.log({ random });
// }


// bulma css 버거메뉴 click 구현
const navbarBurger = document.querySelector('.navbar-burger')
const navbarBasicExample = document.querySelector('#navbarBasicExample')
let burgerClicker = false;
navbarBurger.addEventListener('click', function(){
  if (!burgerClicker) {
    navbarBurger.classList.add('is-active');
    navbarBasicExample.classList.add('is-active');
    burgerClicker = true;
  } else {
    navbarBurger.classList.remove('is-active');
    navbarBasicExample.classList.remove('is-active');
    burgerClicker = false;
  }
})

// sticky nav메뉴 구현
const navbar = document.querySelector('.main-nav')
window.addEventListener("scroll", () => {
  let y = window.pageYOffset;
  if (y > 150) {
    navbar.classList.add('stickyToTop');
  } else {
    navbar.classList.remove('stickyToTop');
  }
})

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
let sliderLength = slideList.length;

// 넘버 버튼 각각마다 클릭 이벤트리스너 추가
for (let i = 0; i < sliderLength; i++){
    numberButtons[i].style.left = (45 + 4*i) + '%'
    numberButtons[i].addEventListener('click', function(){
        slider.style.transform = `translate(-${i * 100}vw)`;
        slider.animate({
            opacity: [0, 1]
        }, {
            duration: 500,
            easing: "ease",
            iterations: 1,
            fill: "both"
        });
        currentSlide = i+1;
    })
}

// 이전 이미지를 보여주는 함수
const slidePrev = function () {
    currentSlide--
    if (currentSlide == 0){
        currentSlide = sliderLength;
    }
    nextTranslate = (currentSlide - 1) * 100 + 'vw';
    slider.style.transform = `translate(-${nextTranslate})`;
    slider.animate({
    opacity: [0, 1]
}, {
    duration: 500,
    easing: "ease",
    iterations: 1,
    fill: "both"
});
}

// 다음 이미지를 보여주는 함수
const slideNext = function (){
    currentSlide++
    if (currentSlide == sliderLength + 1){
        currentSlide = 1;
    }
    nextTranslate = (currentSlide - 1) * 100 + 'vw'; 
    slider.style.transform = `translate(-${nextTranslate})`;
    slider.animate({
        opacity: [0, 1]
    }, {
        duration: 500,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });
}

// Interval 설정
let slideTimer = setInterval(slideNext, 3000);

// 컨테이너에 mouseenter/mouseleave 을 통한 Interval 설정, 버튼 opacity 설정
container.addEventListener('mouseenter', function(){
    clearInterval(slideTimer);
    sliderButton.forEach((e)=>{
      e.style.opacity = 1;
    })
})

container.addEventListener('mouseleave', function(){
    slideTimer = setInterval(slideNext, 3000);
    sliderButton.forEach((e)=>{
      e.style.opacity = 0;
    })
})

// 이전 / 다음 버튼에 클릭 이벤트리스너 설정
document.querySelector('.slider-prev-button').addEventListener('click', slidePrev);
document.querySelector('.slider-next-button').addEventListener('click', slideNext);
