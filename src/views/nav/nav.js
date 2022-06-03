const getCookie = (name) => {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? unescape(value[2]) : null;
};

const navFunc = function () {
    const navbarComponent = document.querySelector('.navbar-end');
    const User = getCookie('login');

    if (!User) {
        const loginNav = document.createElement('a');
        const registerNav = document.createElement('a');
        loginNav.setAttribute('class', 'navbar-item');
        loginNav.setAttribute('href', '/login');
        loginNav.innerText = '로그인';
        registerNav.setAttribute('class', 'navbar-item');
        registerNav.setAttribute('href', '/register');
        registerNav.innerText = '회원가입';
        navbarComponent.appendChild(loginNav);
        navbarComponent.appendChild(registerNav);
    } else if (User) {
        fetch('/users/isAdmin')
            .then((res) => res.json())
            .then((data) => {
                if (data.isAdmin) {
                    const adminNav = document.createElement('a');
                    adminNav.setAttribute('class', 'navbar-item');
                    adminNav.setAttribute('href', '/admin-main');
                    adminNav.innerText = '관리자페이지';
                    navbarComponent.appendChild(adminNav);
                }
            });
        const mypageNav = document.createElement('a');
        const logoutNav = document.createElement('a');
        const cartNav = document.createElement('a');
        mypageNav.setAttribute('class', 'navbar-item');
        mypageNav.setAttribute('href', '/my-page');
        mypageNav.innerText = '마이페이지';
        logoutNav.setAttribute('class', 'navbar-item');
        logoutNav.setAttribute('href', '/users/logout');
        logoutNav.innerText = '로그아웃';
        cartNav.setAttribute('class', 'navbar-item');
        cartNav.setAttribute('href', '/cart');
        cartNav.innerText = '장바구니';
        navbarComponent.appendChild(mypageNav);
        navbarComponent.appendChild(logoutNav);
        navbarComponent.appendChild(cartNav);
    }

    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarBasicExample = document.querySelector('#navbarBasicExample');
    let burgerClicker = false;
    navbarBurger.addEventListener('click', function () {
        if (!burgerClicker) {
            navbarBurger.classList.add('is-active');
            navbarBasicExample.classList.add('is-active');
            burgerClicker = true;
        } else {
            navbarBurger.classList.remove('is-active');
            navbarBasicExample.classList.remove('is-active');
            burgerClicker = false;
        }
    });

    // sticky nav메뉴 구현
    const navbar = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        let y = window.pageYOffset;
        if (y > 40) {
            navbar.classList.add('stickyToTop');
        } else {
            navbar.classList.remove('stickyToTop');
        }
    });
    // control-buttons를 y값 기준으로 opeacity,bottom 값 설정
    const controlButtons = document.querySelector('.control-buttons');
    window.addEventListener('scroll', function () {
        let y = window.pageYOffset;
        if (y > 41) {
            controlButtons.style.opacity = '1';
            controlButtons.style.bottom = '15px';
        } else {
            controlButtons.style.opacity = '0';
            controlButtons.style.bottom = '-58px';
        }
    });

    // top버튼 위로 이동하는 함수
    document
        .querySelector('.top-button')
        .addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    // 세대별 페이지 새로고침 막기
    document
        .querySelector('.is-arrowless')
        .addEventListener('click', function (e) {
            e.preventDefault();
        });
    document.querySelector('.nav-user-button').href =
        window.location.origin + '/' + 'my-page';
    document.querySelector('.nav-cart-button').href =
        window.location.origin + '/' + 'cart';
};
