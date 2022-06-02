import * as Api from '/api.js';

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
    const datas = await Api.get('/admin/category');
    const targetData = await datas.find(function(data){
        return (data.name === name && data.gender === gender && data.recommendAge == recommendAge);
    });
    return targetData.categoryId;
    } catch (err) {
    console.error(err.stack);
    alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    );
    };
};

function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if(input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader();
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.getElementById("preview-image")
            previewImage.src = e.target.result
        };
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0]);
    };
};
// input file에 change 이벤트 부여
const inputImage = document.getElementById("imageInput")
inputImage.addEventListener("change", e => {
    readImage(e.target)
});

// 상품 등록 함수
async function registerProduct(e) {
    try {
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
        if (!name) {
            return alert('상품명을 입력해주세요');
        };

        if (!category) {
            return alert('카테고리를 선택해주세요');
        };

        if (!gender) {
            return alert('성별을 선택해주세요');
        };

        if (!recommendAge) {
            return alert('연령대를 선택해주세요');
        };

        if (!madeBy) {
            return alert('제조사를 입력해주세요');
        };

        if (!description) {
            return alert('상품 설명을 작성해주세요');
        };

        if (!src.files[0]){
            return alert('사진을 업로드해주세요')
        }

        if (!inventory) {
            return alert('재고를 입력해주세요');
        };

        if (!price) {
            return alert('가격을 입력해주세요');
        };
        
        let formData = new FormData(myForm);
        // const categoryId = await getCategoryId(category, gender, recommendAge);
        // // 받아 온 category, gender, recommendAge를 지우고, categoryId로 변환하여 추가
        // formData.delete('category');
        // formData.delete('gender');
        // formData.delete('recommendAge');
        // formData.append('categoryId', categoryId); 
        
        // formdata 확인용, 배포 전 삭제
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        

        // header : enctype="multipart/form-data"로 전송됨 코드, 관리자 계정 인증 관련 필요
        await fetch("http://localhost:5000/admin/product/create/", {
            method: 'POST',
            body: formData
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    };
};
// 카테고리의 option들을 갱신해주는 함수
async function changeSelectOptions() {
    try {
        const options = await Api.get('/category/getName');
        const optionContainer = document.querySelector('#categorySelectBox');
        options.forEach((option) => {
            optionContainer.insertAdjacentHTML('beforeend', `
                <option value="${option}"> ${option} </option>
            `);
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    };
};

changeSelectOptions()
// form안의 버튼 클릭했을 시 (submit) 제품 등록.
let myForm = document.querySelector('form');
myForm.addEventListener('submit', registerProduct);


