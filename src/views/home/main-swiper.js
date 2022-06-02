const outer = document.querySelector('.main-products-slide-container');
const inner = document.querySelector('.main-products-container');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
leftButton.addEventListener('click', leftSwipe);
rightButton.addEventListener('click', rightSwipe);

function leftSwipe() {
    if (inner.style.transform  === `translate(-0vw)`) {return};
    
}

function rightSwipe() {
    if (inner.style.transform  === `translate(-0vw)`) {return};
    const sliderLength = inner.childElementCount;
    console.log(inner);
    console.log(sliderLength);
}

