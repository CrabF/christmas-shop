//Переменные бургер-оверлэя
const burgerButton = document.querySelector(".header__container-image");
const body = document.querySelector(".main");
const headerOverlay = document.querySelector(".header__overlay");

//Основная функция по открытию/скрытию оверлэя
burgerButton.addEventListener("click", () => {
  //Если на боди нет оверфлоу хиден, то оверлей скрыт. Открываем его
  if (!body.classList.contains("main_hidden")) {
    showOverlay();
    if (headerOverlay.classList.contains("header__overlay_show")) {
      const links = headerOverlay.getElementsByTagName("a");
      //При клике на ссылки внутри, оверлей закрывается
      Array.from(links).forEach((link) => {
        link.addEventListener("click", hideOverlay);
      });
    }
  } else {
    hideOverlay();
  }
});

function hideOverlay() {
  body.classList.remove("main_hidden");
  headerOverlay.classList.toggle("header__overlay_show");
  //Просто опасити накидывается и потом снимается для анимации смены картинки бургера
  burgerButton.classList.add("header__container-image_hide");
  setTimeout(() => {
    burgerButton.src = "../images/Header/Burger.svg";
    burgerButton.classList.remove("header__container-image_hide");
  }, 300);
}

function showOverlay() {
  body.classList.add("main_hidden");
  headerOverlay.classList.toggle("header__overlay_show");
  //Просто опасити накидывается и потом снимается для анимации смены картинки бургера
  burgerButton.classList.add("header__container-image_hide");
  setTimeout(() => {
    burgerButton.src = "../images/Header/BurgerChrest.svg";
    burgerButton.classList.remove("header__container-image_hide");
  }, 300);
}