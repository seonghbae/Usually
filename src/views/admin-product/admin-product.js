import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#product-item-container');
// 입력으로 들어오는 상품 상세 페이지로 이동
function productPage(productId) {
    window.location.href = `/admin-product/edit/${productId}`;
}
// 상품 정보를 가져오는 함수
async function getProductList() {
    const productDatas = await Api.get('/productInfo');
    return productDatas;
}

// 상품 목록을 받아 html로 뿌려주는 함수
async function showProductList(productDatas) {
    try {
        // api로 데이터를 받아옴
        productItemContainer.innerHTML = '';
        productDatas.forEach((product) => {
            const itemTag = document.createElement('div');
            itemTag.className = 'item';
            itemTag.setAttribute('id', product.productId);
            const imageTag = document.createElement('figure');
            imageTag.classList.add('image', 'is-square');
            imageTag.innerHTML = `<img src="${product.src}" alt="${product.name}">`;
            // 상품 클릭시 해당 상품 상세 페이지로 이동
            imageTag.addEventListener('click', () =>
                productPage(product.productId)
            );
            const contentTag = document.createElement('div');
            contentTag.classList.add('content', 'has-text-centered');
            contentTag.innerHTML = `<a href="/admin-product/edit/${
                product.productId
            }"><strong>${product.name}</strong></a>
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

// 카테고리로 선택 태그를 만들어주는 함수
async function makeCategoryOptions() {
    // 카테고리의 종류대로 option을 추가
    // gender 남/녀 recommendAge는 10/20/30으로 팀끼리 고정하기로 합의함
    try {
        const nameSelectBox = document.querySelector('#nameSelectBox');
        const options = await Api.get('/category/getName');
        options.forEach((option) => {
            nameSelectBox.insertAdjacentHTML(
                'beforeend',
                `
            <option value="${option}" class="notification"> ${option} </option>
        `
            );
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}
// filter 후 화면에 상품들을 나열하는 함수, 동기적으로 api를 호출하고 있기 때문에 속도가 느립니다.
async function filterAndshowProductList() {
    const name = document.querySelector('#nameSelectBox').value;
    const gender = document.querySelector('#genderSelectBox').value;
    const recommendAge = document.querySelector('#recommendAgeSelectBox').value;
    const targetData = [];
    for (const data of productDatas) {
        const categoryData = await Api.get('/admin/category', data.categoryId);
        if (
            (categoryData.name === name || !name) &&
            (categoryData.gender === gender || !gender) &&
            (categoryData.recommendAge === Number(recommendAge) ||
                !recommendAge)
        ) {
            targetData.push(data);
        }
    }
    // 위 방법을 개선해보고자 사용했던 2가지 방안들. 적용되지 않고 있음.
    // const targetData = productDatas.filter(async (data) => {
    //     const categoryData = await Api.get('/admin/category', data.categoryId);
    //     console.log(((categoryData.name === name || !name) &&
    //     (categoryData.gender === gender || !gender) &&
    //     (categoryData.recommendAge === Number(recommendAge) || !recommendAge)
    //     ))
    //     return ((categoryData.name === name || !name) &&
    //         (categoryData.gender === gender || !gender) &&
    //         (categoryData.recommendAge === Number(recommendAge) || !recommendAge)
    //         )
    // })
    // const targetData = [];
    // productDatas.forEach(async (data) => {
    //     const categoryData = await Api.get('/admin/category', data.categoryId);
    //     if ((categoryData.name === name || !name) &&
    //         (categoryData.gender === gender || !gender) &&
    //         (categoryData.recommendAge === Number(recommendAge) || !recommendAge)
    //         ) {
    //             targetData.push(data);
    //         }
    // })
    await showProductList(targetData);
}

makeCategoryOptions();
const productDatas = await getProductList();
showProductList(productDatas);
document
    .querySelector('.product-search')
    .addEventListener('click', filterAndshowProductList);
