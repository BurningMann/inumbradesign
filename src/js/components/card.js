import { lettersAndSymbols } from './utils.js';
import { gsap } from 'gsap';

// Class representing a Card
export class Card {
  // Initialize DOM and style related properties
  DOM = {
    // main DOM element
    el: null,
    // .card__img element
    img: null,
    // .card__img-wrap element (dynamically created in the layout function)
    imgWrap: null,
    // .card__img-inner "slice" elements (dynamically created in the layout function)
    slices: null,
    // .card__date element
    date: null,
    // .card__title element
    title: null,
    // .card__link element
    link: null,
  };
  // Card image url
  imageURL;
  // Settings
  settings = {
    // vertical || horizontal alignment
    orientation: 'vertical',
    // Total number of slices for the inner images (clip paths)
    slicesTotal: 5,
    // Animation values
    animation: {
      duration: 0.5,
      ease: 'power3.inOut',
    },
  };

  /**
   * Sets up the necessary elements, data, and event listeners for a Card instance.
   * @param {HTMLElement} DOM_el - The DOM element that represents the card.
   * @param {Object} options - The options for customizing the card. These options will override the default settings.
   */
  constructor(DOM_el, options) {
    // Merge settings and options.
    this.settings = Object.assign({}, this.settings, options);

    this.DOM.el = DOM_el;
    this.DOM.img = this.DOM.el.querySelector('.card__img');

    // Splitting chars for date, title and link
    this.chars = {};

    this.DOM.el.querySelectorAll('[data-splitting]').forEach((el, index) => {
      this.chars[`infoItem${index + 1}`] = el.querySelectorAll('.char');
    });

    if (this.DOM.img) {
      // Extracts the image URL from the style of the DOM image element
      this.imageURL = this.DOM.img.getAttribute('style').match(/url\((['"])?(.*?)\1\)/)[2];

      // Calls the `layout` function to create the necessary structure for the card
      this.layout();
    }

    // Initialize the events
    this.initEvents();
  }

  layout() {
    this.DOM.imgWrap = document.createElement('div');
    this.DOM.imgWrap.classList = 'card__img-wrap';
    let slicesStr = '';
    for (let i = 0; i < this.settings.slicesTotal; ++i) {
      slicesStr += `<div class="card__img-inner" style="background-image:url(${this.imageURL})"></div>`;
    }
    this.DOM.imgWrap.innerHTML = slicesStr;
    this.DOM.slices = this.DOM.imgWrap.querySelectorAll('.card__img-inner');
    // append the new wrap element to the card img element
    this.DOM.img.appendChild(this.DOM.imgWrap);
    // Set the --columns or --rows CSS variable value to be the same as the settings.slicesTotal
    this.DOM.img.style.setProperty(
      this.settings.orientation === 'vertical' ? '--columns' : '--rows',
      this.settings.slicesTotal
    );

    // Set the clip paths of each slice
    this.setClipPath();
  }

  setClipPath() {
    this.DOM.slices.forEach((slice, position) => {
      let a1 = (position * 100) / this.settings.slicesTotal;
      let b1 = (position * 100) / this.settings.slicesTotal + 100 / this.settings.slicesTotal;

      gsap.set(slice, {
        clipPath:
          this.settings.orientation === 'vertical'
            ? `polygon(${a1}% 0%, ${b1}% 0%, ${b1}% 100%, ${a1}% 100%)`
            : `polygon(0% ${a1}%, 100% ${a1}%, 100% ${b1}%, 0% ${b1}%)`,
      });
      const isVertical = this.settings.orientation === 'vertical';
      gsap.set(slice, { [isVertical ? 'left' : 'top']: position * -1 });
    });
  }

  /**
   * Initializes event listeners for mouseenter and mouseleave events.
   */
  initEvents() {
    this.onMouseenterFn = () => this.mouseEnter();
    this.onMouseleaveFn = () => this.mouseLeave();

    this.DOM.el.addEventListener('mouseenter', this.onMouseenterFn);
    this.DOM.el.addEventListener('mouseleave', this.onMouseleaveFn);
  }

  mouseEnter() {
    const isVertical = this.settings.orientation === 'vertical';

    for (let key in this.chars) {
      this.shuffleChars(this.chars[key]);
    }

    if (this.DOM.img) {
      gsap
        .timeline({
          defaults: {
            duration: this.settings.animation.duration,
            ease: this.settings.animation.ease,
          },
        })
        .addLabel('start', 0)
        .fromTo(
          this.DOM.img,
          {
            [isVertical ? 'yPercent' : 'xPercent']: 100,
            opacity: 0,
          },
          {
            [isVertical ? 'yPercent' : 'xPercent']: 0,
            opacity: 1,
          },
          'start'
        )
        .fromTo(
          this.DOM.imgWrap,
          {
            [isVertical ? 'yPercent' : 'xPercent']: -100,
          },
          {
            [isVertical ? 'yPercent' : 'xPercent']: 0,
          },
          'start'
        )
        .fromTo(
          this.DOM.slices,
          {
            [isVertical ? 'yPercent' : 'xPercent']: (pos) =>
              pos % 2 ? gsap.utils.random(-75, -25) : gsap.utils.random(25, 75),
          },
          {
            [isVertical ? 'yPercent' : 'xPercent']: 0,
          },
          'start'
        );
    }
  }

  mouseLeave() {
    const isVertical = this.settings.orientation === 'vertical';

    if (this.DOM.img) {
      gsap
        .timeline({
          defaults: {
            duration: this.settings.animation.duration,
            ease: this.settings.animation.ease,
          },
        })
        .addLabel('start', 0)
        .to(
          this.DOM.img,
          {
            [isVertical ? 'yPercent' : 'xPercent']: 100,
            opacity: 0,
          },
          'start'
        )
        .to(
          this.DOM.imgWrap,
          {
            [isVertical ? 'yPercent' : 'xPercent']: -100,
          },
          'start'
        )
        .to(
          this.DOM.slices,
          {
            [isVertical ? 'yPercent' : 'xPercent']: (pos) =>
              pos % 2 ? gsap.utils.random(-75, 25) : gsap.utils.random(25, 75),
          },
          'start'
        );
    }
  }

  /**
   * Shuffles the inner HTML of each character in the array, randomizing it 3 times
   * and eventually setting it back to its initial value.
   *
   * @param {Element[]} arr - An array of DOM elements representing individual characters.
   * Each element must have a 'data-initial' attribute that stores its initial value.
   */
  shuffleChars(arr) {
    arr.forEach((char, position) => {
      gsap.killTweensOf(char);
      gsap.fromTo(
        char,
        {
          opacity: 0,
        },
        {
          duration: 0.04,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          repeat: 3,
          repeatRefresh: true,
          opacity: 1,
          repeatDelay: 0.06,
          onComplete: () => gsap.set(char, { innerHTML: char.dataset.char, delay: 0.03 }),
        }
      );
    });
  }
}
