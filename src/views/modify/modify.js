import * as Api from '/api.js';
import { validateEmail, getCookie } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const emailModify = document.querySelector('#email-modify');
const passwordCheck = document.querySelector('#password-check');
const passwordModify = document.querySelector('#password-modify');
const modifyButton = document.querySelector('#modify-button');
const deleteButton = document.querySelector('#delete-button');

modifyButton.addEventListener('click', handleModify);
deleteButton.addEventListener('click', handleDelete);

// 회원정보 수정 진행
async function handleModify(e) {
    e.preventDefault();

    const email = emailModify.value;
    const currentPassword = passwordCheck.value;
    const password = passwordModify.value;

    // 잘 입력했는지 확인
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;

    if (!isEmailValid || !isPasswordValid) {
        return alert(
            '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.'
        );
    }
    //수정 api 요청
    try {
        const data = { email, currentPassword, password };

        const result = await Api.patch('/users', 'edit', data);
        if (!result) {
            throw new Error('수정 과정에서 에러가 일어났습니다');
        }
        alert(`정상적으로 수정되었습니다.`);

        // 기본 페이지로 이동
        window.location.href = '/';
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}

async function handleDelete(e) {
    e.preventDefault();

    try {
        await fetch(`/users/unregister`, {
            method: 'DELETE',
        });
        alert('정상적으로 유저가 삭제되었습니다.');
        window.location.href = '/';
    } catch (err) {
        alert(
            `삭제가 되지 않았습니다. 확인 후 다시 시도해주세요: ${err.message}`
        );
    }
}
