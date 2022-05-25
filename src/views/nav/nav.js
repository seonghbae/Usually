async function navFunc() {
    const navbarBurger = await document.querySelector('.navbar-burger')
    const navbarBasicExample = await document.querySelector('#navbarBasicExample')
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
    const navbar = await document.querySelector('.main-nav')
    window.addEventListener("scroll", () => {
      let y = window.pageYOffset;
      if (y > 150) {
        navbar.classList.add('stickyToTop');
      } else {
        navbar.classList.remove('stickyToTop');
      }
    })
}

