import * as Api from '/api.js';
import { validateEmail, jwtDecoder, getCookie } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const emailModify = document.querySelector('#email-modify');
const passwordCheck = document.querySelector('#password-check');
const passwordModify = document.querySelector('#password-modify');
const modifyButton = document.querySelector('#modify-button');
const deleteButton = document.querySelector('#delete-button');

const token = getCookie('token');
const shortId = jwtDecoder(token);

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.

modifyButton.addEventListener('click', handleModify);
deleteButton.addEventListener('click', handleDelete);

// 회원정보 수정 진행
async function handleModify(e) {
    e.preventDefault();

    const email = emailModify.value;
    const password = passwordModify.value;

    // 잘 입력했는지 확인
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;

    if (!isEmailValid || !isPasswordValid) {
        return alert(
            '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.'
        );
    }
    // 로그인 api 요청
    try {
        const data = { email, password };

        const result = await Api.post('/users/login', data);

        // 로그인 성공, 토큰을 세션 스토리지에 저장
        // 물론 다른 스토리지여도 됨
        sessionStorage.setItem('token', token);

        alert(`정상적으로 로그인되었습니다.`);

        // 로그인 성공

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
        await fetch(`/users/unregister/${shortId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        alert(
            `삭제가 되지 않았습니다. 확인 후 다시 시도해주세요: ${err.message}`
        );
    }
}
