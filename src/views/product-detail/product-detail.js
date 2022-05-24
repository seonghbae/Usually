import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const image = document.querySelector('#image');
const madeBy = document.querySelector('#madeBy');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const inventoryButton = document.querySelector('#inventoryButton');
const buyButton = document.querySelector('#buyButton');
// const button = ""; // 카테고리나 홈에서 사진 등

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  // button.addEventListener('click', showProductList);
}

// 회원가입 진행
async function showProductDetail(productId) {
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

  const res = await fetch(`/product/${productId}`);
  const data = await res.json();

  image.src = data.img;
  madeBy.innerHTML = data.madeBy;
  name.innerHTML = data.name;
  price.innerHTML = data.price;

  // inventoryButton.addEventListener("click", );
  // buyButton.addEventListener("click", );
}

export { showProductDetail }