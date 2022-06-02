import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const image = document.querySelector('#image');
const madeBy = document.querySelector('#madeBy');
const name = document.querySelector('#name');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const inventoryButton = document.querySelector('#inventory-button');
const purchaseButton = document.querySelector('#purchase-button');
const reviewBody = document.querySelector('#review-body');
const pageNumbers = document.querySelector('#page-numbers');
const reviewWriteButton = document.querySelector('#review-write-button');
const reviewInput = document.querySelector('#review-input');
const reviewCreateContainer = document.querySelector('#review-create-container');
const reviewCreateButton = document.querySelector('#review-create-button');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
    getUserId();
    showProductDetail();
    showReviews();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    inventoryButton.addEventListener('click', addToInventory);
    purchaseButton.addEventListener('click', purchaseCallback);
    reviewWriteButton.addEventListener('click', reviewWriteCallback);
    reviewCreateButton.addEventListener('click', reviewCreateCallback);
}

async function getUserId() {
    await Api.get('/users/getId');
}

// 장바구니 클릭시 localStorage에 항목 저장
async function addToInventory() {
    const productId = location.pathname.split('/')[2];

    try {
        const data = await Api.get('/productInfo', productId);
        localStorage.setItem(data.productId, JSON.stringify(data));
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 선택 상품 아이디 배열 저장, 이동
function purchaseCallback() {
    localStorage.setItem(
        'productIds',
        JSON.stringify([location.pathname.split('/')[2]])
    );
    location.href = '/payment';
}

// 리뷰 작성
function reviewWriteCallback() {
    reviewCreateContainer.style.display = 'block';
    reviewWriteButton.style.display = 'none';
}

// 리뷰 작성 완료
async function reviewCreateCallback() {
    const productId = location.pathname.split('/')[2];
    try {
        await Api.post('/review', {
            title: '',
            content: reviewInput.innerHTML,
            author: '',
            productId: productId,
        });
    
        reviewWriteButton.style.display = 'block';
        reviewCreateContainer.style.display = 'none';
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 상품 상세
async function showProductDetail() {
    // /product/:productId 형식이라 split으로 productId만 가져오기
    const productId = location.pathname.split('/')[2];

    try {
        // api로 데이터를 받아옴
        const product = await Api.get('/productInfo', productId);
        image.src = product.src;
        madeBy.innerHTML = product.madeBy;
        name.innerHTML = product.name;
        price.innerHTML = addCommas(product.price) + '원';
        description.innerHTML = product.description;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

async function addReviews() {
    const productId = location.pathname.split('/')[2];

    try {
        // const review1 = {
        //     title: '1',
        //     content: `귀걸이랑 세트로 샀는데 반짝반짝 예쁘네요 :) 사진을 못 찍었는데… ㅠㅠ 검은 목폴라니트 위에 하니까 딱 시선집중 포인트되고 좋았어요!`,
        //     author: 'sns*202',
        //     productId: productId,
        // };
        // const review2 = {
        //     title: '2',
        //     content: `귀걸이랑 셋트로 구매했는데 너무 이뻐요^^`,
        //     author: 'rsd***',
        //     productId: productId,
        // };
        // const review3 = {
        //     title: '3',
        //     content: `귀걸이랑 세트로 구매했어요 예뻐요~`,
        //     author: 'dlgus2***',
        //     productId: productId,
        // };
        // const createReview1 = await Api.post('/review', review1);
        // const createReview2 = await Api.post('/review', review2);
        // const createReview3 = await Api.post('/review', review3);
        // console.log(createReview1);
        // console.log(createReview2);
        // console.log(createReview3);
        for(let  i = 4; i < 16; i++) {
            const review = {
                title: `${i}`,
                content: `${i}`,
                author: 'rsd***',
                productId: productId,
            }
            await Api.post('/review', review);
        }
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 리뷰
async function showReviews() {
    const productId = location.pathname.split('/')[2];

    try {
        const { totalPage } = await Api.get('/review', productId);

        pageCallback(1, totalPage);

        for (let i = 1; i < totalPage; i++) {
            const pTag = document.createElement('p');
            pTag.className = 'page-number';
            pTag.innerHTML = i;
            pTag.addEventListener('click', () => {
                pageCallback(i, totalPage);
            });
            pageNumbers.appendChild(pTag);
        }
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

async function pageCallback(pageNumber, totalPage) {
    const productId = location.pathname.split('/')[2];

    try {
        const { page, reviews, perPage } = await Api.get('/review', `${productId}?page=${pageNumber}`);
        reviewBody.innerHTML = '';
        const pageReviews = (totalPage >= perPage * page) ? reviews.slice(perPage * (page - 1), perPage * page) : reviews.slice(perPage * (page - 1));
        reviews.forEach((review) => {
            reviewBody.innerHTML += 
            `<div class="review-body-container">
                <div class="review" id="review-${review.reviewId}">
                    <div class="review-content">${review.content}</div>
                    <div class="review-author">${review.author}</div>
                    <button class="review-update" id="review-update-icon">
                        <span class="icon">
                            <i class="fas fa-pencil" aria-hidden="true"></i>
                        </span>
                    </button>
                    <button class="review-delete" id="review-delete-icon">
                        <span class="icon">
                            <i class="fas fa-trash-can" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="review-update-container" style="display: none;">
                    <textarea class="review-input" type="text"></textarea>
                    <div class="review-button">
                        <button class="button is-danger" id="review-update-button">수정완료</button>
                    </div>
                </div>
            </div>`;
            const reviewUpdateIcon = document.querySelector('#review-update-icon');
            const reviewDeleteIcon = document.querySelector('#review-delete-icon');
            const reviewUpdateButton = document.querySelector('#review-update-button');
            // reviewUpdateIcon.addEventListener('click', );
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
    
}
