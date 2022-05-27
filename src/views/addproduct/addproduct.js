// bulma css file이름 검색 함수
const fileInput = document.querySelector('#file-form-container input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#file-form-container .file-name');
      fileName.textContent = fileInput.files[0].name;
      console.log(fileInput);
    }
  }


// 상품 등록 함수
async function registerProduct(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name.value);
    // console.log(e.target.category.value);
    // console.log(e.target.gender.value);
    // console.log(e.target.age.value);
    // console.log(e.target.madeBy.value);
    // console.log(e.target.description.value);
    // // console.log(e.target.image-file.files[0]);
    // console.log(e.target.inventory.value);
    // console.log(e.target.price.value);

    const name = e.target.name.value;
    if (!name) {
        return alert('상품명을 입력해주세요');
    };

    const category = e.target.category.value;
    if (!category) {
        return alert('카테고리를 선택해주세요');
    };

    const gender = e.target.gender.value;
    if (!gender) {
        return alert('성별을 선택해주세요');
    };

    const age = e.target.age.value;
    if (!age) {
        return alert('연령대를 선택해주세요');
    };

    const madeBy = e.target.madeBy.value;
    if (!madeBy) {
        return alert('제조사를 입력해주세요');
    };

    const description = e.target.description.value;
    if (!description) {
        return alert('상품 설명을 작성해주세요');
    };

    const src = document.querySelector('#imageInput')
    if (!src.files[0]){
        return alert('사진을 업로드해주세요')
    }

    const inventory = e.target.inventory.value;
    if (!inventory) {
        return alert('재고를 입력해주세요');
    };

    const price = e.target.price.value;
    if (!price) {
        return alert('가격을 입력해주세요');
    };
    
    let formData = new FormData(myForm);

    fetch("http://localhost:5000/admin/product/create/",
    {
        body: formData,
        method: "post"
    });

    // /* key 확인하기 */
    // for (let key of formData.keys()) {
    //     console.log(key);
    // }

    // /* value 확인하기 */
    // for (let value of formData.values()) {
    //     console.log(value);
    // }
}





let myForm = document.querySelector('form')
myForm.addEventListener('submit', registerProduct)