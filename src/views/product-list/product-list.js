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

// 입력으로 들어오는 주소로 이동
function newPage(productId) {
    window.location.href = `/product/${productId}`;
}

// 상품 목록
async function showProductList() {
    // /product/category/:categoryId 형식이라 split으로 productId만 가져오기
    const splitLocation = location.pathname.split("/");
    const type = splitLocation[2];
    const target = splitLocation[3];
    try {
        // api로 데이터를 받아옴
        const datas = await Api.get('/productInfo', `${type}/${target}`);

        productItemContainer.innerHTML = '';
        let tileAncestorTag;

        datas.forEach((data, index, array) => {
            if (index % 4 === 0) {
                tileAncestorTag = document.createElement('div');
                tileAncestorTag.classList.add('tile', 'is-ancestor');
                tileAncestorTag.innerHTML = '';
            }

            const tileParentTag = document.createElement('div');
            tileParentTag.classList.add('tile', 'is-parent');

            const tileChildTag = document.createElement('article');
            tileChildTag.classList.add('tile', 'is-child');
            tileChildTag.setAttribute('id', data.productId);

            const imageTag = document.createElement('figure');
            imageTag.classList.add('image', 'is-square');
            imageTag.innerHTML = `<img src="${data.src}" alt="${data.name}">`;
            // 상품 클릭시 해당 상품 상세 페이지로 이동
            imageTag.addEventListener('click', () => newPage(data.productId));

            const contentTag = document.createElement('div');
            contentTag.classList.add('content', 'has-text-centered');
            contentTag.innerHTML = 
            `<strong>${data.name}</strong>
            <p>${addCommas(data.price)}원</p>`;

            tileChildTag.appendChild(imageTag);
            tileChildTag.appendChild(contentTag);
            tileParentTag.appendChild(tileChildTag);
            tileAncestorTag.appendChild(tileParentTag);

            if (index % 4 === 3) {
                productItemContainer.appendChild(tileAncestorTag);
            } else if (index === array.length - 1 && index % 4 !== 3) {
                // Bulma css tile로 구성하니까 한 줄에 4개 들어가도록 구성
                // 한 줄에 넣은 개수대로 1/n 로 한 줄을 채워서 4개 되도록 빈공간 삽입
                for (let i = index % 4; i < 3; i++) {
                    const emptyDivTag = document.createElement('div');
                    emptyDivTag.classList.add('tile', 'is-parent');
                    tileAncestorTag.appendChild(emptyDivTag);
                }
                productItemContainer.appendChild(tileAncestorTag);
            }
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}
