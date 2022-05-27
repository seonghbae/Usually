// document ready 이후에 실행되어야 하기 때문에 함수로 묶어줌
const navFunc = function() {
    // burger 메뉴 동작을 위한 함수
    const navbarBurger = document.querySelector('.navbar-burger')
    const navbarBasicExample = document.querySelector('#navbarBasicExample')
    let burgerClicker = false;
    navbarBurger.addEventListener('click', function(){
      if (!burgerClicker) {
        navbarBurger.classList.add('is-active');
        navbarBasicExample.classList.add('is-active');
        burgerClicker = true;
      } else {
        navbarBurger.classList.remove('is-active');
        navbarBasicExample.classList.remove('is-active');
        burgerClicker = false;
      }
    })
    // sticky nav메뉴 구현
    const navbar = document.querySelector('.main-nav')
    window.addEventListener("scroll", () => {
      let y = window.pageYOffset;
      if (y > 150) {
        navbar.classList.add('stickyToTop');
      } else {
        navbar.classList.remove('stickyToTop');
      }
    })
    // 세션스토리지에 로그인 토큰이 있다면 로그인을 로그아웃으로, 회원가입을 마이페이지로 바꿔줌
    // if (sessionStorage.getItem('token')){
    //   document.querySelector('.nav-login').innerHTML = `
    //     <a href="/logout" class="navbar-item">
    //       <i class="fa fa-sign-out nav-icon" aria-hidden="true"></i>
    //       로그아웃
    //     </a>
    //   `
    //   document.querySelector('.nav-signin').innerHTML = `
    //     <a href="/my-page" class="navbar-item">
    //       <i class="fa fa-sign-in nav-icon" aria-hidden="true"></i>
    //       마이페이지
    //     </a>
    //   `
    // }
}
