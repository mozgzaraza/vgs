$(function () {

  $('.servises__list').slick({
    responsive: [{
      breakpoint: 9999,
      settings: 'unslick'
    },
    {
      breakpoint: 576,
      settings: {  
        arrows: false,
        touchthreshold: 30,
        dots: true,
      }
    }]
  });

// ОТКРЫТИЕ МЕНЮ

  $('.menu__btn, .menu a').on('click', function () {
    $('.menu__inner').toggleClass('menu__inner--active');
    $('.menu__btn').toggleClass('menu__btn--active');
    $('body').toggleClass('menu-lock');
  });

  // СКРОЛЛ МЕНЮ

  $(".menu a, .main a").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  // ФОРМА СВЯЗИ

  $("form").submit(function () { 
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }).done(function () {
      alert("Спасибо! Ваша заявка отправлена! Мы с Вами свяжемся в течении 30 минут! ");
      setTimeout(function () {
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // ПОПАП ДЛЯ ПРОДУКТОВ

  $('.catalog__card-link, .catalog__card-btn').on('click', function () {
    var parent = $(this).closest('.catalog__card');
    var imgSrc = parent.find('.catalog__card-img').attr('src');

    var title = parent.find('.catalog__card-title').text();
    var characteristic = parent.find('.catalog__characteristic').html();
    var info = parent.find('.catalog__info').html();

    var otherParent = $('.popup__content');
    otherParent.find('.popup-product__title').text(title);
    otherParent.find('.popup-product__characteristic').html(characteristic);
    otherParent.find('.popup-product__info').html(info);
    otherParent.find('.popup-product__img').attr('src', imgSrc);
  });

  // КАТАЛОГ

  $('.catalog__item-top').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('catalog__item--active');
    $(this).next('.catalog__item-bottom').slideToggle();
  });

  // АНИМАЦИЯ

  const animItems = document.querySelectorAll('.element-animation');

  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add('element-show');
        } else {
          animItem.classList.remove('element-show');
        }
      }
    }

    function offset(el) {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
      animOnScroll();
    }, 300);
  }


  // ПОПАПЫ СТРУКТУРА

  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  const timeOut = 300;


  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup, .popup-product'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open, .popup-product.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup, .popup-product'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
 
      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeOut);
    
  } 

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeOut);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open, .popup-product.open');
      popupClose(popupActive);
    }
  });

  // СЛАЙДЕР ОТЗЫВОВ

  $('.reviews__slider').slick({
    waitForAnimate: false,
    prevArrow: '<button type="button" class="slick-prev"><svg width="35" height="81" viewBox="0 0 35 81" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector 154"d="M32 3L4 40.5L32 78"stroke="#212864"stroke-width="5"stroke-linecap="round"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg width="35" height="81" viewBox="0 0 35 81" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector 155" d="M3 3L31 40.5L3 78"stroke="#212864"stroke-width="5"stroke-linecap="round"/></svg></button>',
  });
});