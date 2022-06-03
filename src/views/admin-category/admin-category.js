import * as Api from '/api.js';

// 카테고리 추가 버튼 눌렀을 시 다른 카테고리들을 가려주고, 카테고리 추가 창을 보여주는 함수
function addCategory() {
    editContainer.style.display = 'flex';
    addButton.style.display = 'none';
    navEdit.innerText = '취소';
    navDelete.innerText = '추가';
    const showContainers = document.querySelectorAll(
        '.category-show-container'
    );
    showContainers.forEach((container) => {
        container.style.display = 'none';
    });
}

// 카테고리 추가 버튼을 누른 후 취소 버튼을 눌렀을 시 원상복구 해주는 함수
function addCategoryCancel() {
    editContainer.style.display = 'none';
    addButton.style.display = '';
    navEdit.innerText = '수정';
    navDelete.innerText = '삭제';
    const showContainers = document.querySelectorAll(
        '.category-show-container'
    );
    showContainers.forEach((container) => {
        container.style.display = 'flex';
    });
}

// 카테고리 추가 확인을 눌렀을 때 작동하는 함수
async function addCategoryConfirm() {
    try {
        const name = document.querySelector('.add-name').value;
        const gender = document.querySelector('.add-gender').value;
        const recommendAge = document.querySelector('.add-recommendAge').value;

        if (!name) {
            alert('종류를 입력해주세요!');
            return;
        }

        if (!gender) {
            alert('성별을 선택해주세요!');
            return;
        }

        if (!recommendAge) {
            alert('연령대를 선택해주세요!');
            return;
        }

        await Api.post('/admin/category/create/', {
            name: name,
            gender: gender,
            recommendAge: recommendAge,
        });
        // 새로고침
        alert('카테고리 추가를 성공하였습니다!');
        window.location.reload();
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 전체 카테고리 목록을 가져와서 html 나열해주는 함수
async function getCategoryAndShow() {
    try {
        const datas = await Api.get('/admin/category');
        datas.forEach((data) => {
            let gender = data.gender === 'man' ? '남성' : '여성';
            categoryListContainer.insertAdjacentHTML(
                'beforeend',
                `
        <div class="columns category-item category-show-container" id="${data.categoryId}">
            <div class="column is-2.4" id="${data.categoryId}-name">${data.name}</div>
            <div class="column is-2.4" id="${data.categoryId}-gender">${gender}</div>
            <div class="column is-2.4" id="${data.categoryId}-recommendAge">${data.recommendAge}대</div>
            <div class="column is-2.4" id="${data.categoryId}-editButton"><button class="button is-success is-light category-edit" value="${data.categoryId}">카테고리 수정</button></div>
            <div class="column is-2.4" id="${data.categoryId}-deleteButton"><button class="button is-danger is-light category-delete" value="${data.categoryId}">카테고리 삭제</button></div>
        </div>
        `
            );
            addEventToEditAndDeleteButton();
        });
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}
//
function addEventToEditAndDeleteButton() {
    document.querySelectorAll('.category-edit').forEach((button) => {
        button.addEventListener('click', editCategory);
    });
    document.querySelectorAll('.category-delete').forEach((button) => {
        button.addEventListener('click', deleteCategory);
    });
}
// 카테고리 수정 버튼을 눌렀을 시에 작동하는 함수
function editCategory(e) {
    const categoryId = e.target.value;
    // 기존값을 유지하기 위해 값들을 저장
    const categoryContainer = document.getElementById(`${categoryId}`);
    const name = document.getElementById(`${categoryId}-name`).innerText;
    let gender = document.getElementById(`${categoryId}-gender`).innerText;
    gender = gender === '남성' ? 'man' : 'woman';
    const recommendAge = parseInt(
        document.getElementById(`${categoryId}-recommendAge`).innerText
    );
    categoryContainer.innerHTML = `
            <div class="column is-2.4"><input type="text" id="${categoryId}-name" class="input category-item"></div>
            <div class="column is-2.4">
                <select class="select" id="${categoryId}-gender" name="gender">
                    <option value="man" class="notification is-primary is-light"> 남성 </option>
                    <option value="woman" class="notification is-warning is-light"> 여성 </option>
                </select>
            </div>
            <div class="column is-2.4">
                <select class="select" id="${categoryId}-recommendAge" name="recommendAge">
                    <option value="10" class="notification is-primary is-light"> 10대 </option>
                    <option value="20" class="notification is-info is-light"> 20대 </option>
                    <option value="30" class="notification is-danger is-light"> 30대 </option>
                </select>
            </div>
            <div class="column is-2.4"><button class="button is-success is-light edit-cancel-button" value="${categoryId}">취소하기</button></div>
            <div class="column is-2.4"><button class="button is-link is-light edit-confirm-button" value="${categoryId}">수정하기</button></div>
        `;
    // 기존값을 유지
    document.getElementById(`${categoryId}-name`).value = name;
    document.getElementById(`${categoryId}-gender`).value = gender;
    document.getElementById(`${categoryId}-recommendAge`).value = recommendAge;
    // 각각 버튼에 이벤트 추가
    addEventToCancelAndConfirmButton();
}

// 카테고리를 삭제하는 함수
async function deleteCategory(e) {
    try {
        const categoryId = e.target.value;
        if (!confirm('정말로 삭제하시겠습니까?')) {
            return;
        }
        await Api.delete('/admin/category', categoryId);
        // 새로고침
        alert('카테고리 삭제에 성공했습니다!');
        window.location.reload();
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

// 카테고리 수정 버튼 클릭 후 나오는 취소하기 버튼과 수정하기 버튼에 이벤트를 넣어주는 함수
function addEventToCancelAndConfirmButton() {
    document.querySelectorAll('.edit-cancel-button').forEach((button) => {
        button.addEventListener('click', editCancel);
    });
    document.querySelectorAll('.edit-confirm-button').forEach((button) => {
        button.addEventListener('click', editConfirm);
    });
}
// 수정을 취소하는 함수
async function editCancel(e) {
    try {
        const categoryId = e.target.value;
        // 값을 저장
        const data = await Api.get('/admin/category', categoryId);
        const gender = data.gender === 'man' ? '남성' : '여성';
        const categoryContainer = document.getElementById(`${categoryId}`);
        categoryContainer.innerHTML = `
            <div class="column is-2.4" id="${categoryId}-name">${data.name}</div>
            <div class="column is-2.4" id="${categoryId}-gender">${gender}</div>
            <div class="column is-2.4" id="${categoryId}-recommendAge">${data.recommendAge}대</div>
            <div class="column is-2.4"><button class="button is-success is-light category-edit" value="${data.categoryId}">카테고리 수정</button></div>
            <div class="column is-2.4"><button class="button is-danger is-light category-delete" value="${data.categoryId}">카테고리 삭제</button></div>
        `;
        // 다시 이벤트를 달아줘야 함
        addEventToEditAndDeleteButton();
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}
// 수정을 완료하는 함수
async function editConfirm(e) {
    try {
        const categoryId = e.target.value;
        const name = document.getElementById(`${categoryId}-name`).value;
        const gender = document.getElementById(`${categoryId}-gender`).value;
        const recommendAge = document.getElementById(
            `${categoryId}-recommendAge`
        ).value;

        if (!name) {
            alert('종류를 입력해주세요!');
            return;
        }
        // api를 한번 더 불러와서 3개 값 대조하여 다른 값만 보내주기보단, 그냥 3개를 다 넣어서 보내는 게 나을 것 같음.
        // 기존 값을 받아오는 방법이 생각이 되면 수정 예정
        await Api.patch('/admin/category', categoryId, {
            name: name,
            gender: gender,
            recommendAge: recommendAge,
        });
        alert('수정에 성공하였습니다!');
        // 수정 완료 후 새로고침
        window.location.reload();
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

getCategoryAndShow();

const addButton = document.querySelector('.category-add');
const categoryListContainer = document.querySelector('.category-container');
const editContainer = document.querySelector('#category-edit-container');

const navEdit = document.querySelector('.nav-edit');
const navDelete = document.querySelector('.nav-delete');
const addCancelButton = document.querySelector('.add-cancel-button');
const addConfirmButton = document.querySelector('.add-confirm-button');
addCancelButton.addEventListener('click', addCategoryCancel);
addConfirmButton.addEventListener('click', addCategoryConfirm);
addButton.addEventListener('click', addCategory);
