import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#productItemContainer');

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
    window.location.href += productId;
}

// 상품 목록
async function showProductList() {
    const data = {
        shortId: '1',
        img: '/ring.jpg',
        madeBy: 'company',
        name: 'The Loop',
        price: 20000,
    };

    const datas = [];
    for (let i = 0; i < 10; i++) datas.push(data);

    productItemContainer.innerHTML = '';
    let tileAncestor;

    datas.forEach((data, index, array) => {
        if (index % 4 === 0) {
            tileAncestor = document.createElement('div');
            tileAncestor.classList.add('tile', 'is-ancestor');
            tileAncestor.innerHTML = '';
        }

        const productItem = document.createElement('div');
        productItem.classList.add('tile', 'is-parent');
        productItem.innerHTML = `<article class="tile is-child" id="${
            data.shortId
        }">
          <figure class="image">
            <img src="${data.img}" alt="${data.name}">
          </figure>
          <div class="content has-text-centered">
            <strong>${data.name}</strong>
            <p>${addCommas(data.price)}원</p>
          </div>
        </article>`;

        // 상품 클릭시 해당 상품 상세 페이지로 이동
        productItem.addEventListener('click', () => newPage(data.shortId));

        tileAncestor.appendChild(productItem);

        if (index % 4 === 3) {
            productItemContainer.appendChild(tileAncestor);
        } else if (index === array.length - 1 && index % 4 !== 3) {
            // Bulma css tile로 구성하니까 한 줄에 4개 들어가도록 구성
            // 한 줄에 넣은 개수대로 1/n 로 한 줄을 채워서 4개 되도록 빈공간 삽입
            for (let i = index % 4; i < 3; i++) {
                tileAncestor.innerHTML += `<div class="tile is-parent"></div>`;
            }
            productItemContainer.appendChild(tileAncestor);
        }
    });
}
