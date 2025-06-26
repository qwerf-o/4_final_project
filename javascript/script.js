document.addEventListener('DOMContentLoaded', () => {
  const toggleMenu = document.querySelector('.toggle-menu');
  const navList = document.querySelector('.nav-list');

  toggleMenu.addEventListener('click', () => {
    toggleMenu.classList.toggle('active');
    navList.classList.toggle('active');
  });

  const researchItems = document.querySelectorAll('.research-item .research-content, .shop-item');

  researchItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      researchItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.add('blur');
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      researchItems.forEach((otherItem) => {
        otherItem.classList.remove('blur');
      });
    });
  });

  animateBorderText();

  const modalOrder = document.getElementById('modal-order');
  const modalForm = document.querySelector('.modal-form');
  const modalFormSuccess = document.querySelector('.modal-form-success');
  const modalClose = document.querySelectorAll('.modal-top');
  const modalOpen = document.querySelector('.shop-merch-item .btn');

  if (modalOpen) {
    modalOpen.addEventListener('click', () => {
      modalOrder.style.display = 'flex';
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalForm.style.display = 'none';
      modalFormSuccess.style.display = 'block';
    });
  }

  if (modalClose) {
    modalClose.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.closest('#modal-order')) {
          modalOrder.style.display = 'none';
          modalForm.reset();
          modalFormSuccess.style.display = 'none';
          modalForm.style.display = 'flex';
        }
        if (item.closest('#modal-letter')) {
          modalLetter.style.display = 'none';
        }
      });
    });
  }

  const footerForm = document.querySelector('.footer-form');
  const modalLetter = document.getElementById('modal-letter');
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    modalLetter.style.display = 'flex';
    footerForm.reset();
  });

  function animateBorderText() {
    const text = 'скоро ';
    const repeatedText = text.repeat(30);

    const borderTexts = document.querySelectorAll('.border-text');
    borderTexts.forEach((element) => {
      element.textContent = repeatedText;
    });
  }

  function createNotFoundItem() {
    const item = document.createElement('div');
    item.className = 'not-found-item';

    item.style.opacity = '0';

    const top = document.createElement('div');
    top.className = 'not-found-top';

    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      top.appendChild(div);
    }

    const content = document.createElement('div');
    content.className = 'not-found-content';

    const p = document.createElement('p');
    p.textContent = 'Страница не найдена';

    const h1 = document.createElement('h1');
    h1.textContent = '404';

    const a = document.createElement('a');
    a.href = 'index.html';
    a.textContent = 'На главную';

    content.append(p, h1, a);
    item.append(top, content);

    setTimeout(() => {
      item.style.opacity = '1';
    }, 800);

    addNotFoundHandler(top);

    return item;
  }

  function addNotFoundHandler(topElement) {
    topElement.addEventListener('click', function () {
      const parent = this.closest('.not-found-item');
      const section = parent.parentElement;
      const items = Array.from(section.querySelectorAll('.not-found-item'));
      const index = items.indexOf(parent);

      parent.classList.add('removing');

      const newItem = createNotFoundItem();

      setTimeout(() => {
        parent.remove();

        section.insertBefore(newItem, section.firstChild);
      }, 500);
    });
  }

  const section = document.querySelector('.not-found');

  if (section) {
    const items = Array.from(section.querySelectorAll('.not-found-item'));

    items.forEach((item) => {
      const top = item.querySelector('.not-found-top');
      if (top) {
        addNotFoundHandler(top);
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
  }

  function animateElement(element) {
    element.classList.add('visible');
    anime({
      targets: element,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutCubic',
    });
  }

  function handleScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    elements.forEach((element) => {
      if (isElementInViewport(element)) {
        animateElement(element);
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);

  document.addEventListener('DOMContentLoaded', handleScroll);
});
