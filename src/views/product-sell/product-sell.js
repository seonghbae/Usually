// 상품 등록 함수
function registerProduct(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.name.value);
    console.log(e.target.category.value);
    console.log(e.target.gender.value);
    console.log(e.target.age.value);
    console.log(e.target.manufacturer.value);
    console.log(e.target.description.value);
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

    const inventory = e.target.inventory.value;
    if (!inventory) {
        return alert('재고를 입력해주세요');
    };

    const price = e.target.price.value;
    if (!price) {
        return alert('가격을 입력해주세요');
    };
    
    const categoryId = getCategoryId(category, gender, age);
    console.log(categoryId)
    // const url = '/admin/product/create/';
    // const data = { name, price, description, madeBy, inventory, categoryId };
    // fetch('/food', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
}

// 카테고리id 받아오는 함수
function getCategoryId(name, gender, recommendAge){
    const url = '/admin/category';
    fetch(url)
        .then(res => {
            return res.json;
        })
        .then(json => {
            console.log(json);
            const categoryId = arr.find(findCategoryId(json, name, gender, recommendAge));
        })
}

// 카테고리id 찾는 함수
function findCategoryId(element, name, gender, recommendAge){
    if (element.name === name && element.gender === gender && element.recommendAge){
        return true;
    }
}

document.querySelector('form').addEventListener('submit', registerProduct)