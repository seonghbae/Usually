import * as Api from '/api.js';

// bulma css file이름 검색 함수
const fileInput = document.querySelector(
    '#file-form-container input[type=file]'
);
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        const fileName = document.querySelector(
            '#file-form-container .file-name'
        );
        fileName.textContent = fileInput.files[0].name;
    }
};

// /admin-product/edit/:productId/ split으로 productId만 가져오기
const productId = location.pathname.split('/')[3];
// productId로 정보 받아오는 함수
async function getProductData(productId) {
    try {
        const data = await Api.get('/productInfo', productId);
        return data;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// categoryId로 정보 받아오는 함수
async function getCategoryData(categoryId) {
    try {
        const data = await Api.get('/admin/category', categoryId);
        return data;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// CategoryId를 받아오는 함수
async function getCategoryId(name, gender, recommendAge) {
    try {
        const datas = await Api.get('/admin/category');
        const targetData = await datas.find(function (data) {
            return (
                data.name === name &&
                data.gender === gender &&
                data.recommendAge == recommendAge
            );
        });

        return targetData.categoryId;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// db와 form 형식의 차이를 해결하기 위해 데이터 형식을 form쪽으로 맞춰주는 함수
async function getProductDataToFormType(productId) {
    const {
        categoryId,
        name,
        price,
        description,
        madeBy,
        inventory,
        sellCount,
        src,
    } = await getProductData(productId);
    const productdata = await getCategoryData(categoryId);
    const { gender, recommendAge } = productdata;
    const category = productdata.name;
    const formTypeData = {
        name,
        category,
        gender,
        recommendAge,
        madeBy,
        description,
        src,
        inventory,
        sellCount,
        price,
    };
    return formTypeData;
}
// form 내의 value들을 기존 제품 정보로 갱신 및 반환
async function formValueSetting(productId) {
    // 제품 상세보기 버튼의 href값을 바꿔준다
    document
        .querySelector('.product-detail-button-link')
        .setAttribute('href', `../../../product/${productId}`);
    // 먼저 option을 가져온다.
    await changeSelectOptions();
    const {
        name,
        category,
        gender,
        recommendAge,
        madeBy,
        description,
        src,
        inventory,
        sellCount,
        price,
    } = await getProductDataToFormType(productId);
    document.querySelector('#titleInput').value = name;
    document.querySelector('#categorySelectBox').value = category;
    document.querySelector('#genderSelectBox').value = gender;
    document.querySelector('#recommendAgeSelectBox').value = recommendAge;
    document.querySelector('#madeByInput').value = madeBy;
    document.querySelector('#descriptionInput').value = description;
    // 사진의 경우 value를 설정해주지 않고 span의 text만 갱신해준다.
    document.querySelector('#fileNameSpan').innerText = src.split('.com/')[1];
    const previewImage = document.getElementById('preview-image');
    previewImage.src = src;
    document.querySelector('#inventoryInput').value = inventory;
    document.querySelector('#sellCountInput').value = sellCount;
    document.querySelector('#priceInput').value = price;
}

formValueSetting(productId);

function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
        // FileReader 인스턴스 생성
        const reader = new FileReader();
        // 이미지가 로드가 된 경우
        reader.onload = (e) => {
            const previewImage = document.getElementById('preview-image');
            previewImage.src = e.target.result;
        };
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0]);
    }
}
// input file에 change 이벤트 부여
const inputImage = document.getElementById('imageInput');
inputImage.addEventListener('change', (e) => {
    readImage(e.target);
});

// 카테고리의 option들을 갱신해주는 함수
async function changeSelectOptions() {
    try {
        const options = await Api.get('/category/getName');
        const optionContainer = document.querySelector('#categorySelectBox');
        options.forEach((option) => {
            optionContainer.insertAdjacentHTML(
                'beforeend',
                `
                <option value="${option}"> ${option} </option>
            `
            );
        });
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

// 제품 수정 함수
async function editProduct(e) {
    try {
        const productId = location.pathname.split('/')[3];
        e.preventDefault();
        // form에 value가 입력되었는지 확인
        if (!e.target.name.value) {
            return alert('제품명을 입력해주세요');
        }

        if (!e.target.category.value) {
            return alert('카테고리를 선택해주세요');
        }

        if (!e.target.gender.value) {
            return alert('성별을 선택해주세요');
        }

        if (!e.target.recommendAge.value) {
            return alert('연령대를 선택해주세요');
        }

        if (!e.target.madeBy.value) {
            return alert('제조사를 입력해주세요');
        }

        if (!e.target.description.value) {
            return alert('제품 설명을 작성해주세요');
        }
        // 사진의 경우 검사해줄 필요 없음. 등록하지 않으면 갱신하지 않으면 됨.
        if (!e.target.inventory.value) {
            return alert('재고를 입력해주세요');
        }

        if (!e.target.price.value) {
            return alert('가격을 입력해주세요');
        }
        // 카테고리id 가져오기
        //const nowCategoryId = await getCategoryId(e.target.category.value, e.target.gender.value, e.target.recommendAge.value);
        let formData = new FormData();
        //formData.append('categoryId', nowCategoryId);
        formData.append('category', e.target.category.value);
        formData.append('gender', e.target.gender.value);
        formData.append('recommendAge', e.target.recommendAge.value);
        formData.append('name', e.target.name.value);
        formData.append('madeBy', e.target.madeBy.value);
        formData.append('description', e.target.description.value);
        // 사진 데이터가 존재한다면 append
        if (document.querySelector('#imageInput').files[0]) {
            formData.append(
                'src',
                document.querySelector('#imageInput').files[0]
            );
        } else {
            formData.append('src', null);
        }
        formData.append('inventory', e.target.inventory.value);
        formData.append('sellCount', e.target.sellCount.value);
        formData.append('price', e.target.price.value);
        // header : enctype="multipart/form-data"로 전송됨 코드, 관리자 계정 인증 관련 필요
        let res = await fetch(`/admin/product/${productId}`, {
            method: 'PATCH',
            body: formData,
        });
        // 응답 코드가 4XX 계열일 때 (400, 403 등)
        if (!res.ok) {
            const errorContent = await res.json();
            const { reason } = errorContent;

            throw new Error(reason);
        }

        alert('제품 수정에 성공하였습니다!');
        window.location.reload();
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}
// 제품 삭제 함수
async function deleteProduct() {
    try {
        const productId = location.pathname.split('/')[3];
        if (!confirm('정말로 삭제하시겠습니까?')) {
            return;
        }
        let res = await Api.delete('/admin/product', productId);
        alert('제품 삭제에 성공하였습니다!');
        window.location.replace('../../../admin-product');
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}
// form submit에 이벤트 추가, delete 버튼에 이벤트 추가
document.querySelector('form').addEventListener('submit', editProduct);
document
    .querySelector('#deleteButton')
    .addEventListener('click', deleteProduct);
