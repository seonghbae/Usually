import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#productItemContainer');
const button = ""; // 카테고리나 홈에서 사진 등

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  button.addEventListener('click', showProductList);
}

// 회원가입 진행
async function showProductList() {
  const res = await fetch('/product');
  const datas = await res.json();

  datas.forEach((data) => {
    const productItem = document.createElement("div");
    productItem.classList.append("message media product-item");
    productItem.setAttribute("id", `${data.shortId}`);
    productItem.innerHTML = 
    `<div class="message media product-item" id="${data.shortId}">
        <div class="media-left">
            <figure class="image">
                <img src="${data.img}" alt="제품 이미지">
            </figure>
        </div>
        <div class="media-content">
            <div class="content">
                <p class="name">${data.name}</p>
                <p class="description">${data.description}</p>
                <p class="price">${addCommas(data.price)}원</p>
            </div>
        </div>
    </div>`;
    // productItem.addEventListener("click");

    productItemContainer.innerHTML += productItem;
    
  });

//   // 로그인 api 요청
//   try {
//     const data = { email, password };

//     const result = await Api.post('/api/login', data);
//     const token = result.token;

//     // 로그인 성공, 토큰을 세션 스토리지에 저장
//     // 물론 다른 스토리지여도 됨
//     sessionStorage.setItem('token', token);

//     alert(`정상적으로 로그인되었습니다.`);

//     // 로그인 성공

//     // 기본 페이지로 이동
//     window.location.href = '/';
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
}
