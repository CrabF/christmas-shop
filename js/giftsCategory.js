let gifts = [];
//Получаем данные из json файла и кладем в переменную
async function getData() {
  try {
    const res = await fetch("./gifts.json");
    if (!res.ok) {
      throw new Error("Ошибка при получении данных");
    }
    gifts = await res.json();
  } catch {
    console.error("Ошибка при получении данных");
  }
}

getData();

//рандомная сортировка подарков для лучшего дизайна
function randomSortedGifts(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Генерируем случайный индекс от 0 до i
    const j = Math.floor(Math.random() * (i + 1));

    // Меняем местами элементы с индексами i и j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//переменная контейнера ul карточек
const cardsContainer = document.querySelector(".gifts-section-container-cards");

//Создание фрагмента для единой оптимальной вставки контента
const fragment = document.createDocumentFragment();

//создаем все наполнение li карточки
function createCard() {
  const card = document.createElement("li");
  card.classList.add("gifts__container-card");
  card.classList.add("gifts__container-card_spec");

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.classList.add("gifts__container-card-image");
  img.src = "";
  img.alt = "";

  figure.appendChild(img);

  const caption = document.createElement("div");
  caption.classList.add("gifts__container-card-caption");

  const subtitle = document.createElement("h4");
  subtitle.classList.add("gifts__container-card-subtitle");
  subtitle.textContent = "";

  const title = document.createElement("h3");
  title.textContent = "";
  title.classList.add("gifts__container-card-title");

  caption.appendChild(subtitle);
  caption.appendChild(title);

  card.appendChild(figure);
  card.appendChild(caption);

  return card;
}

function appendCards(sortedGifts) {
  for (let i = 0; i < sortedGifts.length; i++) {
    const card = createCard();

    const img = card.querySelector(".gifts__container-card-image");
    const subtitle = card.querySelector(".gifts__container-card-subtitle");
    const title = card.querySelector(".gifts__container-card-title");

    title.textContent = sortedGifts[i].name;

    switch (sortedGifts[i].category) {
      case "For Work":
        img.src = "./images/GiftsSection/ball.png";
        subtitle.textContent = "For Work";
        subtitle.classList.add("gifts__container-card-subtitle_purple");
        break;
      case "For Harmony":
        img.src = "./images/GiftsSection/ball3.png";
        subtitle.textContent = "For Harmony";
        subtitle.classList.add("gifts__container-card-subtitle_pink");
        break;
      case "For Health":
        img.src = "./images/GiftsSection/ball2.png";
        subtitle.textContent = "For Health";
        subtitle.classList.add("gifts__container-card-subtitle_green");
        break;
    }

    fragment.appendChild(card);
  }

  cardsContainer.appendChild(fragment);
}

setTimeout(() => {
  const sortedGifts = randomSortedGifts(gifts);
  appendCards(sortedGifts);
}, 300);

//кнопки категорий
const allCat = document.querySelector("#all");
const forWorkCat = document.querySelector("#forWork");
const forHealthCat = document.querySelector("#forHealth");
const forHarmonyCat = document.querySelector("#forHarmony");

function sortCategoryGifts(arr, param) {
  return arr.filter((item) => {
    return item.category === param;
  });
}

function updClasses(param) {
  switch (param) {
    case "forWork":
      forWorkCat.classList.add("gifts-section-container-tab_active");
      forHealthCat.classList.remove("gifts-section-container-tab_active");
      forHarmonyCat.classList.remove("gifts-section-container-tab_active");
      allCat.classList.remove("gifts-section-container-tab_active");
      break;
    case "forHealth":
      forWorkCat.classList.remove("gifts-section-container-tab_active");
      forHealthCat.classList.add("gifts-section-container-tab_active");
      forHarmonyCat.classList.remove("gifts-section-container-tab_active");
      allCat.classList.remove("gifts-section-container-tab_active");
      break;
    case "forHarmony":
      forWorkCat.classList.remove("gifts-section-container-tab_active");
      forHealthCat.classList.remove("gifts-section-container-tab_active");
      forHarmonyCat.classList.add("gifts-section-container-tab_active");
      allCat.classList.remove("gifts-section-container-tab_active");
      break;
    case "all":
      forWorkCat.classList.remove("gifts-section-container-tab_active");
      forHealthCat.classList.remove("gifts-section-container-tab_active");
      forHarmonyCat.classList.remove("gifts-section-container-tab_active");
      allCat.classList.add("gifts-section-container-tab_active");
      break;
  }
}

forWorkCat.addEventListener("click", (event) => {
  const param = "For Work";
  const sortedGifts = sortCategoryGifts(gifts, param);
  cardsContainer.innerHTML = "";
  appendCards(sortedGifts);
  updClasses(event.target.id);
});

forHealthCat.addEventListener("click", (event) => {
  const param = "For Health";
  const sortedGifts = sortCategoryGifts(gifts, param);
  cardsContainer.innerHTML = "";
  appendCards(sortedGifts);
  updClasses(event.target.id);
});

forHarmonyCat.addEventListener("click", (event) => {
  const param = "For Harmony";
  const sortedGifts = sortCategoryGifts(gifts, param);
  cardsContainer.innerHTML = "";
  appendCards(sortedGifts);
  updClasses(event.target.id);
});

allCat.addEventListener("click", (event) => {
  const sortedGifts = randomSortedGifts(gifts);
  cardsContainer.innerHTML = "";
  appendCards(sortedGifts);
  updClasses(event.target.id);
});
