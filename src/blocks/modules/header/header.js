import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector('.header');
const menuHandler = document.querySelector('.js-menu');
/* const headerMobile = header.querySelector('.header__mobile-wrapper');
const headerMobileNav = header.querySelector('.header__mobile-wrapper-nav');

headerMobile.addEventListener('click', () => {
  if (headerMobile.classList.contains('is-active')) {
    headerMobileNav.style.maxHeight = '0';
    setTimeout(() => {
      headerMobileNav.classList.remove('is-active');
      headerMobile.classList.remove('is-active');
    }, 300);
  } else {
    headerMobileNav.classList.add('is-active');
    headerMobile.classList.add('is-active');
    setTimeout(() => {
      headerMobileNav.style.maxHeight = headerMobileNav.scrollHeight + 'px';
    }, 300);
  }
});

const siteSections = document.querySelectorAll('.navigate-section');
function setActiveLink(id) {
  if (id) {
    const activeLinks = document.querySelectorAll('.header__link.is-active');
    activeLinks.forEach((item) => item.classList.remove('is-active'));

    const currentLinks = document.querySelectorAll(`a[href^="#${id}"]`);
    currentLinks.forEach((item) => item.classList.add('is-active'));
  }
}
 */
if (header && menuHandler) {
  menuHandler.addEventListener('click', () => {
    menuHandler.classList.toggle('is-active');
    header.querySelectorAll('.header-box__row.js-hidden').forEach((el, index) =>
      setTimeout(() => {
        el.classList.toggle('is-hidden');
      }, 50 * index + 1)
    );
  });

  setTimeout(() => {
    gsap.to(header, {
      scrollTrigger: {
        trigger: document.body,
        start: `${window.innerHeight / 3} top`,
        end: `${window.innerHeight / 3} top`,
        onEnter: () => {
          header.classList.add('is-fixed');
          header.querySelectorAll('.header-box__row.js-hidden').forEach((el, index) =>
            setTimeout(() => {
              el.classList.add('is-hidden');
            }, 50 * index + 1)
          );
        },
        onEnterBack: () => {
          header.classList.remove('is-fixed');
          menuHandler.classList.remove('is-active');
          header.querySelectorAll('.header-box__row.js-hidden').forEach((el, index) =>
            setTimeout(() => {
              el.classList.remove('is-hidden');
            }, 50 * index + 1)
          );
        },
      },
    });
  }, 0);
}
