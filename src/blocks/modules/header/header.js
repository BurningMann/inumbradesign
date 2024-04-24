import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector('.header');
const menuHandler = document.querySelector('.js-menu');

if (header && menuHandler) {
  menuHandler.addEventListener('click', () => {
    header.classList.toggle('is-active');
    menuHandler.classList.toggle('is-active');
    header.querySelectorAll('.header-box__row.js-hidden').forEach((el, index) =>
      setTimeout(() => {
        el.classList.toggle('is-hidden');
      }, 50 * index + 1)
    );

    if (header.classList.contains('is-active')) {
      window.stopLenis();
    } else {
      window.startLenis();
    }
  });

  setTimeout(() => {
    gsap.to(header, {
      scrollTrigger: {
        trigger: document.body,
        start: `${window.innerHeight / 3} top`,
        end: `${window.innerHeight / 3} top`,
        onEnter: () => {
          header.classList.add('is-fixed');
          if (window.innerWidth > 576) {
            header.querySelectorAll('.header-box__row.js-hidden').forEach((el, index) =>
              setTimeout(() => {
                el.classList.add('is-hidden');
              }, 50 * index + 1)
            );
          }
        },
        onEnterBack: () => {
          header.classList.remove('is-fixed');
          header.classList.remove('is-active');
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
