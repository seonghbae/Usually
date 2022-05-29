// bulma css file이름 검색 함수
const fileInput = document.querySelector('#file-form-container input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#file-form-container .file-name');
      fileName.textContent = fileInput.files[0].name;
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


// 상품 등록 함수
async function registerProduct(e) {
    e.preventDefault();
    // form에 담긴 value들
    const name = e.target.name.value;
    const category = e.target.category.value;
    const gender = e.target.gender.value;
    const recommendAge = e.target.recommendAge.value;
    const madeBy = e.target.madeBy.value;
    const description = e.target.description.value;
    const src = document.querySelector('#imageInput')
    const inventory = e.target.inventory.value;
    const price = e.target.price.value;
    // form에 value가 입력되었는지 확인
    // if (!name) {
    //     return alert('상품명을 입력해주세요');
    // };

    // if (!category) {
    //     return alert('카테고리를 선택해주세요');
    // };

    // if (!gender) {
    //     return alert('성별을 선택해주세요');
    // };

    // if (!recommendAge) {
    //     return alert('연령대를 선택해주세요');
    // };

    // if (!madeBy) {
    //     return alert('제조사를 입력해주세요');
    // };

    // if (!description) {
    //     return alert('상품 설명을 작성해주세요');
    // };

    // if (!src.files[0]){
    //     return alert('사진을 업로드해주세요')
    // }

    // if (!inventory) {
    //     return alert('재고를 입력해주세요');
    // };

    // if (!price) {
    //     return alert('가격을 입력해주세요');
    // };
    
    let formData = new FormData(myForm);
    const { categoryId } = await getCategoryId(category, gender, recommendAge)
    // 받아 온 name, gender, recommendAge를 지우고, categoryId로 변환하여 추가
    formData.delete(name);
    formData.delete(gender);
    formData.delete(recommendAge);
    formData.append('categoryId', categoryId);
    // formdata 확인용, 배포 전 삭제
    // for (let data of formData.keys()) {
    //     console.log(data.key, data.value);
    // }

    // for (let value of formData.values()) {
    //     console.log(value);
    // }

    // header : enctype="multipart/form-data"로 전송됨
    fetch("http://localhost:5000/admin/product/create/", {
        method: 'post',
        body: formData
    })
}

// form안의 버튼 클릭했을 시 (submit) 제품 등록.
let myForm = document.querySelector('form')
myForm.addEventListener('submit', registerProduct)