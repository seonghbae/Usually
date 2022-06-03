// 이미지 슬라이더 구현
let currentSlide = 1;
let currentTranslate = 0;
let nextTranslate = 0;
// 슬라이더와 버튼을 담고 있는 컨테이너
const container = document.querySelector('.slider-container');
// 슬라이더 전체
const slider = document.querySelector('.slider');
// 슬라이더 이미지 리스트
const slideList = document.querySelectorAll('.slider-image');
// 전체 버튼 리스트
const sliderButton = document.querySelectorAll('.slider-button');
// 넘버 버튼 리스트
const numberButtons = document.querySelectorAll('.slider-number-button');
numberButtons[0].style.background = '#ffae96';
let sliderLength = slideList.length - 2;
slider.style.transform = `translate(-100vw)`;
// 넘버 버튼 각각마다 클릭 이벤트리스너 추가
for (let i = 0; i < sliderLength; i++){
    numberButtons[i].addEventListener('click', function(){
        // 클릭되기 전 현재 버튼 색깔 변경
        numberButtons[currentSlide - 1].style.background = '#bcd7d7';
        // 캐러셀이기 때문에 현재 슬라이드는 i+1번째에 존재
        currentSlide = i+1;
        // 버튼 색깔 변경
        numberButtons[i].style.background = '#ffae96';
        nextTranslate = (currentSlide) * 100 + 'vw'; 
        // 다음 이미지로 translate
        slider.animate({
            transform: [`translate(-${nextTranslate})`]
        }, {
            duration: 1000,
            easing: "ease",
            iterations: 1,
            fill: "both"
        });
    });
};

// 이전 이미지를 보여주는 함수
const slidePrev = function () {
    preventButtonClick()
    currentTranslate = (currentSlide) * 100 + 'vw'
    nextTranslate = (currentSlide - 1) * 100 + 'vw'; 
    // 왼쪽 방향으로 이미지 이동
    slider.animate({
        transform: [`translate(-${currentTranslate})`, `translate(-${nextTranslate})`]
    }, {
        duration: 1000,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });
    // 버튼 색깔 변경
    numberButtons[currentSlide - 1].style.background = '#bcd7d7';
    currentSlide--;
    // 만약 왼쪽끝으로 이동되었다면, 다시 맨 오른쪽으로 이동시켜줌
    if (currentSlide == 0){
        currentSlide = sliderLength;
        currentTranslate = (currentSlide) * 100 + 'vw'; 
        slider.style.transform = `translate(-${currentTranslate})`;
    };
    numberButtons[currentSlide - 1].style.background = '#ffae96';
};

// 다음 이미지를 보여주는 함수
const slideNext = function () {
    preventButtonClick()
    currentTranslate = (currentSlide) * 100 + 'vw';
    nextTranslate = (currentSlide + 1) * 100 + 'vw'; 
    slider.animate({
        transform: [`translate(-${currentTranslate})`, `translate(-${nextTranslate})`]
    }, {
        duration: 1000,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });
    numberButtons[currentSlide - 1].style.background = '#bcd7d7';
    currentSlide++;
    if (currentSlide == sliderLength + 1){
        currentSlide = 1;
        currentTranslate = (currentSlide) * 100 + 'vw'; 
        slider.style.transform = `translate(-${currentTranslate})`;
    };
    numberButtons[currentSlide - 1].style.background = '#ffae96';
};


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
        });
    });

    container.addEventListener('mouseleave', function() {
        slideTimer = setInterval(slideNext, 5000);
        sliderButton.forEach((e)=>{
        e.style.opacity = 0;
        });
    });
};
// 왼쪽, 오른쪽 버튼을 여러번 클릭할 시 이미지가 이상하게 움직이는 현상을 해결하기 위한 함수
function preventButtonClick() {
    // 먼저 이벤트를 제거
    document.querySelector('.slider-prev-button').removeEventListener('click', slidePrev);
    document.querySelector('.slider-next-button').removeEventListener('click', slideNext);
    setTimeout(() => {
        // 이미지 이동이 종료되는 1초 이후 이벤트 다시 추가
        document.querySelector('.slider-prev-button').addEventListener('click', slidePrev);
        document.querySelector('.slider-next-button').addEventListener('click', slideNext);
    }, 1000);

}
addAllEvents();

// Interval 설정
let slideTimer = setInterval(slideNext, 5000);
