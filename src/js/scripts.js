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

import './import/modules';
import './import/components';
