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
    window.location.href = `/admin-product/edit/${productId}`;
}

// 상품 목록
async function showProductList() {
    // /product/category/:categoryId 형식이라 split으로 productId만 가져오기
    // const splitLocation = location.pathname.split("/");
    // const type = splitLocation[2];
    // const target = splitLocation[3];
    try {
        // api로 데이터를 받아옴 , `${type}/${target}`
        const products = await Api.get('/productInfo');

        productItemContainer.innerHTML = '';

        products.forEach((product) => {
            const itemTag = document.createElement('div');
            itemTag.className = 'item';
            itemTag.setAttribute('id', product.productId);

            const imageTag = document.createElement('figure');
            imageTag.classList.add('image', 'is-square');
            imageTag.innerHTML = `<img src="${product.src}" alt="${product.name}">`;
            // 상품 클릭시 해당 상품 상세 페이지로 이동
            imageTag.addEventListener('click', () => productPage(product.productId));

            const contentTag = document.createElement('div');
            contentTag.classList.add('content', 'has-text-centered');
            contentTag.innerHTML = 
            `<strong>${product.name}</strong>
            <p>${addCommas(product.price)}원</p>`;

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
