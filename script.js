/*add sticky class on page scroll*/
const nav = document.getElementById('topNav');
window.onscroll = function () {
  if (window.pageYOffset > 100) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}
/*change header bg color on scroll*/

//nav dropdown menu
document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]")
  if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

  let currentDropdown
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]')
    currentDropdown.classList.toggle('active')
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove('active')
  })
})
//nav dropdown menu

//hamburger menu for small screens
const navButton = document.querySelector('button[aria-expanded]');

function toggleNav({target}) {
  const expanded = target.getAttribute('aria-expanded') === 'true' || false;
  navButton.setAttribute('aria-expanded', !expanded);
}

navButton.addEventListener('click', toggleNav);
//hamburger menu for small screens

//hero sliders
const buttons = document.querySelectorAll('[data-slider-btn]');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const offset = button.dataset.sliderButton === 'next' ? 1 : -1;
    const slides = button
      .closest('[data-slider]')
      .querySelector('[data-slides]');

      const activeSlide = slides.querySelector('[data-active');
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
  })
})


//func to throttle scroll event in reveal elements on scroll
const throttle = (fn, delay) => {
	let last = 0;
	return () => {
		const now = new Date().getTime();
		if (now - last < delay) {
			return;
		}
		last = now;
		return fn();
	}
}

//reveal elements on scroll
class RevealOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll('.revOnScrl')
    this.browserHeight = window.innerHeight
    this.hideInitially()
    this.events()
  }

  events() {
    window.addEventListener('scroll', throttle(() => {
      console.log('scroll func ran')
      this.itemsToReveal.forEach(el => {
        if (el.isRevealed == false) {
          this.calculateIfScrolledTo(el)
        }
      })
    }, 500))
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      console.log('element was calculated')
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
      if (scrollPercent < 85) {
        el.classList.add('reveal-item--is-visible')
        el.isRevealed = true
        // if (el.isLastItem) {
        //   window.removeEventListener('scroll', throttle)
        // }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add('reveal-item')
      el.isRevealed = false
    })
    //now we'll remove the scroll event listener once all items hav been revealed
    // this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
  }
}

let revealOnScroll = new RevealOnScroll()

//home page counter
const counters = document.querySelectorAll('.number');
const speed = 200;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 2);
    } else {
      count.innerText = target;
    }
  }
  updateCount();
})


//about page progress bar func start
function updateProgressBar(progressBar, value) {
  value = Math.round(value);
  progressBar.querySelector('.progressBar__bars--fill').style.width = `${value}%`;
  progressBar.querySelector('.progressBar__bars--percent').textContent = `${value}%`;
}

//bar 1
const pBarOne = document.querySelector('.progressBar__1');
updateProgressBar(pBarOne, 75);

//bar 2
const pBarTwo = document.querySelector('.progressBar__2');
updateProgressBar(pBarTwo, 85);

//bar 3
const pBarThree = document.querySelector('.progressBar__3');
updateProgressBar(pBarThree, 90);

//bar 4
const pBarFour = document.querySelector('.progressBar__4');
updateProgressBar(pBarFour, 80);
//about page progress bar func end