import * as Api from '/api.js';
const tableContent = document.getElementById('table-content');
async function renderUser() {
    try {
        const userList = await Api.get('/admin', 'userlist');
        if (!userList) {
            throw new Error('회원정보를 불러오는 것에 실패했습니다');
        }
        userList.forEach((user) => {
            let singleUserInfo = document.createElement('tr');
            let role = '';
            if (user.role === 'basic-user') {
                role = '일반 고객';
            } else {
                role = '관리자';
            }
            singleUserInfo.innerHTML += `
            <th>
                ${user.fullName}
            </th>
            <th>
                ${user.email}
            </th>
            <th>
            <div class="dropdown is-hoverable is-right">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>비밀번호</span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item">
                            <p style="font-size:10px;">${user.password}</p>
                        </div>
                    </div>
                </div>
            </div>
            </th>
            <th>
                ${user.gender}
            </th>
            <th>
                ${role}
            </th>
            `;

            tableContent.appendChild(singleUserInfo);
        });
    } catch (err) {
        console.error(err.stack);
    }
}
renderUser();
