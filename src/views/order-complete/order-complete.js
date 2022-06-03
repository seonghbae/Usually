// 요소(element), input 혹은 상수
const orderDetailButton = document.querySelector('#order-detail-button');
const shoppingButton = document.querySelector('#shopping-button');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    orderDetailButton.addEventListener('click', () => {
        pageCallback('/order-history');
    });
    shoppingButton.addEventListener('click', () => {
        pageCallback('/');
    });
}

function pageCallback(href) {
    window.location.href = href;
}
