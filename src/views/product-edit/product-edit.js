import * as Api from '/api.js';

// bulma css file이름 검색 함수
const fileInput = document.querySelector('#file-form-container input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#file-form-container .file-name');
      fileName.textContent = fileInput.files[0].name;
    }
}

// localhost:5000/admin/product/edit/:productId/ split으로 productId만 가져오기
const productId = location.pathname.split("/")[4];
// productId로 정보 받아오는 함수
async function getProductData(productId) {
    try {
        const getResponse = await fetch(`http://localhost:5000/productInfo/${productId}`);
        const data = await getResponse.json();
        return data;
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }   
}
getProductData(productId);

// categoryId로 정보 받아오는 함수
async function getCategoryData(categoryId) {
    try {
        const getResponse = await fetch(`http://localhost:5000/admin/category/${categoryId}`);
        const data = await getResponse.json();
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
    const getResponse = await fetch('http://localhost:5000/admin/category/');
    const datas = await getResponse.json();
    const targetData = await datas.find(function(data){
        return (data.name === name && data.gender === gender && data.recommendAge == recommendAge);
    })
    console.log(targetData);
    return targetData;
    } catch (err) {
    console.error(err.stack);
    alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    );
    }
}

// form 내의 select태그 option을 category정보로 갱신하는 함수 (아직 구현못함)
async function changeSelectOptions() {
    try {
        const selectNode = document.querySelectorAll('select');
        
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// form 내의 value들을 상품 정보로 갱신
async function formValueSetting(productId){
    const { categoryId, name, price, description, madeBy, inventory, sellCount, src } = await getProductData(productId);
    const data = await getCategoryData(categoryId);
    const { gender, recommendAge } = data;
    const category = data.name;
    document.querySelector('#titleInput').value = name;
    document.querySelector('#categorySelectBox').value = category;
    document.querySelector('#genderSelectBox').value = gender;
    document.querySelector('#recommendAgeSelectBox').value = recommendAge;
    document.querySelector('#madeByInput').value = madeBy;
    document.querySelector('#descriptionInput').value = description;
    // 사진부분 어떻게 구현??
    document.querySelector('#fileNameSpan').value = src;
    document.querySelector('#inventoryInput').value = inventory;
    document.querySelector('#sellCountInput').value = sellCount;
    document.querySelector('#priceInput').value = price;
}

formValueSetting(productId);

// 상품 수정 함수
async function registerProduct(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const category = e.target.category.value;
    const gender = e.target.gender.value;
    const recommendAge = e.target.recommendAge.value;
    let formData = new FormData(myForm);
    const { categoryId } = await getCategoryId(category, gender, recommendAge);
    formData.delete(name);
    formData.delete(gender);
    formData.delete(recommendAge);
    formData.append('categoryId', categoryId);
    fetch(`http://localhost:5000/admin/product/${productId}`, {
        method: 'patch',
        body: formData
    })

    /* key 확인하기 */
    for (let data of formData.keys()) {

        console.log(data.key, data.value);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
        console.log(value);
    }
}

let myForm = document.querySelector('form')
myForm.addEventListener('submit', registerProduct)