
//Слайдера переменные
const sliderContainer = document.querySelector(".slider__container");
const controls = sliderContainer.querySelectorAll(
  ".slider__container-buttons-button"
);
const leftBtn = controls[0];
const rigthBtn = controls[1];
const sliderRow = sliderContainer.querySelector(".slider__container-row");

//переменная в которую запишем сколько пикселей слайдера скрыто и не видит пользователь
let sliderOffset;
let currentStep = 0;
let allSteps;

//Отслеживаем изменение размера экрана
window.addEventListener("resize", () => {
  //сброс шагов при изменении экрана
  currentStep = 0;
  setSliderStep(currentStep);
  initialSlider();
});

// Инициализация слайдера каждый раз при ресайз страницы
function initialSlider() {
  allSteps = getWindowSize();
  sliderOffset = getSliderOffset();
  setSliderStep(currentStep);
  buttonState(currentStep);
}

//если экран меньше 768 то шагов для слайдера больше
function getWindowSize() {
  if (window.innerWidth <= 768) {
    allSteps = 6;
  } else {
    allSteps = 3;
  }
}
//вычитаем из общей ширины слайдера видимую пользователем часть и делим на шаги. Получаем сколько один шаг прокручивает пикселей
function getSliderOffset() {
  getWindowSize();
  return (sliderRow.scrollWidth - sliderRow.clientWidth) / allSteps;
}

//смещаем слайдер вправо на количество пикселей в шаге умноженно на шаг
function setSliderStep(step) {
  currentStep = step;
  sliderRow.style.transform = `translateX(${-sliderOffset * step}px)`;
}

rigthBtn.addEventListener("click", () => {
  let step = currentStep + 1;
  if (step <= allSteps) {
    setSliderStep(step);
    buttonState(step);
  }
});

leftBtn.addEventListener("click", () => {
  let step = currentStep - 1;
  if (step >= 0) {
    setSliderStep(step);
    buttonState(step);
  }
});

//просто блокировка кнопок
function buttonState(step) {
  leftBtn.disabled = step === 0;
  rigthBtn.disabled = step === allSteps;
}

//первичная инициализация слайдера
initialSlider();
