import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#product-item-container');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    showProductList();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

// 입력으로 들어오는 상품 상세 페이지로 이동
function productPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 상품 목록
async function showProductList() {
    const splitLocation = location.pathname.split('/');
    const type = splitLocation[2];
    const target = splitLocation[3];
    try {
        const products = await Api.get('/productInfo', `${type}/${target}`);

        productItemContainer.innerHTML = '';

        products.forEach((product) => {
            const itemTag = document.createElement('div');
            itemTag.className = 'item';
            itemTag.setAttribute('id', product.productId);

            const imageTag = document.createElement('figure');
            imageTag.classList.add('image', 'is-square');
            imageTag.innerHTML = `<img src="${product.src}" alt="${product.name}">`;
            imageTag.addEventListener('click', () =>
                productPage(product.productId)
            );

            const nameTag = document.createElement('strong');
            nameTag.innerHTML = product.name;
            nameTag.addEventListener('click', () =>
                productPage(product.productId)
            );

            const priceTag = document.createElement('p');
            priceTag.innerHTML = `${addCommas(product.price)}원`;

            const contentTag = document.createElement('div');
            contentTag.classList.add('content', 'has-text-centered');
            contentTag.appendChild(nameTag);
            contentTag.appendChild(priceTag);

            itemTag.appendChild(imageTag);
            itemTag.appendChild(contentTag);
            productItemContainer.appendChild(itemTag);
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}
