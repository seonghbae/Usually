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
function registerProduct(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.name.value);
    console.log(e.target.category.value);
    console.log(e.target.gender.value);
    console.log(e.target.age.value);
    console.log(e.target.madeBy.value);
    console.log(e.target.description.value);
    // console.log(e.target.image-file.value);
    console.log(e.target.inventory.value);
    console.log(e.target.price.value);

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

    const imageInput = document.querySelector('#imageInput')
    if (!imageInput.files[0]){
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
    
    const categoryId = getCategoryId(category, gender, age);
    console.log(categoryId);
    // const url = '/admin/product/create/';
    // const data = { name, price, description, madeBy, inventory, categoryId };
    // fetch('/food', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
}

// 카테고리id 받아오는 함수
function getCategoryId(name, gender, recommendAge){
    const url = 'http://localhost:5000/admin/category';
    fetch(url)
        .then(res => {
            return res.json;
        })
        .then(parsingData)
        .then((data) => {
            console.log(data);
            const categoryId = data.findCategoryId(name, gender, recommendAge);
            console.log(categoryId);
        })
}

// 카테고리id 찾는 함수
function findCategoryId(name, gender, recommendAge){
    if (data.name === name && data.gender === gender && data.recommendAge){
        return true;
    }
}

// json 파싱 함수
function parsingData(data){
    return new Promise((res, rej) => {
      const newDatas = [];
      data.data.movies.map(m => {
        const newData = {
          name: m.name,
          gender: m.gender,
          recommendAge: m.recommendAge,
          categoryId: m.categoryId
        }
        newDatas.push(newData);
      });
      res(newDatas);
    })
}

document.querySelector('form').addEventListener('submit', registerProduct)