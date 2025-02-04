import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.startLenis = () => {
  window.lenis = new Lenis();
  document.querySelector('html').classList.remove('noskroll');
  document.querySelector('body').classList.remove('noskroll');

  window.lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

window.stopLenis = () => {
  window.lenis.destroy();
  document.querySelector('html').classList.add('noskroll');
  document.querySelector('body').classList.add('noskroll');
};

setTimeout(() => {
  window.startLenis();
}, 0);

Fancybox.bind('[data-fancybox]', {
  Hash: false,
});

import { preloadImages } from './components/utils.js';

// Importing the Card class from 'card.js' file
import { Card } from './components/card.js';

// Calling the Splitting function to split the text into individual characters,
// it's a text animation library which splits the text for complex animations.
Splitting();

// An array to hold different configurations/settings for different sets of cards.
// Each setting object includes the orientation, number of slices, and animation details.
const settingsArray = [
  // 1st set of settings: Vertical orientation with 5 slices.
  {
    orientation: 'vertical',
    slicesTotal: 5,
    animation: {
      duration: 0.6,
      ease: 'expo.inOut',
    },
  },
  // 4th set of settings: Horizontal orientation with 15 slices and specific animation duration and easing.
  {
    orientation: 'horizontal',
    slicesTotal: 15,
    animation: {
      duration: 0.6,
      ease: 'expo.inOut',
    },
  },
];

let loop = 0;
let loopMax = 5;
[...document.querySelectorAll('.projects-grid .projects-grid__item')].forEach((el, index) => {
  if (index <= 1) {
    el.classList.add('is-large');

    return;
  }

  loop += 1;

  if (loop === 4 || loop === 5) {
    el.classList.add('is-large');
  }

  if (loop === loopMax) {
    loop = 0;
  }
});

// Initialize the Cards
[...document.querySelectorAll('.project-card.animated')].forEach((cardEl, index) => {
  const cardImgVertical = cardEl.querySelector('.card__img.is-vertical');
  const cardImgHorizontal = cardEl.querySelector('.card__img.is-horizontal');

  if (cardEl.closest('.is-large') && cardImgVertical) {
    cardImgVertical.remove();
  } else if (cardImgHorizontal) {
    cardImgHorizontal.remove();
  }

  new Card(cardEl, settingsArray[0]);
});

// Preload images, then remove loader (loading class) from body
/* preloadImages('.canvas-wrap').then(() => document.body.classList.remove('loading')); */

import './import/modules';
import './import/components';
import './components/mouse-trailer';
