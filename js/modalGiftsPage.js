const containerCardsOnGiftsPage = document.querySelector(
  ".gifts-section-container-cards"
);

const overlay = document.querySelector(".overlay");
const modal = overlay.querySelector(".modal");
const listsFlakes = document.querySelectorAll(".modal__flakes");
const arrayListsFlakes = Array.from(listsFlakes);
const closeBtn = document.querySelector(".modal__close");

//общий обработчик на ul с карточками для открытия модалки
containerCardsOnGiftsPage.addEventListener("click", (event) => {
  let target = event.target;
  if (target.closest(".gifts__container-card")) {
    openModal(target);
  }
});

function getModalInfo(cardName) {
  return gifts.filter((card) => {
    return card.name === cardName;
  });
}

function setModalInfo(modal, info) {
  const img = modal.querySelector(".gifts__container-card-image");
  const subtitle = modal.querySelector(".modal__captionContainerSubtitle");
  const title = modal.querySelector(".modal__captionContainerTitle");
  const description = modal.querySelector(".modal__description");

  const liveCount = modal.querySelector("#live");
  const createCount = modal.querySelector("#create");
  const loveCount = modal.querySelector("#love");
  const dreamCount = modal.querySelector("#dream");

  liveCount.textContent = info[0].superpowers.live;
  createCount.textContent = info[0].superpowers.create;
  loveCount.textContent = info[0].superpowers.love;
  dreamCount.textContent = info[0].superpowers.dream;

  subtitle.textContent = info[0].category;
  title.textContent = info[0].name;
  description.textContent = info[0].description;

  generateSnowFlakes(info[0].superpowers);
  //так как не отчищаются классы нигде больше
  subtitle.classList.remove("gifts__container-card-subtitle_purple");
  subtitle.classList.remove("gifts__container-card-subtitle_pink");
  subtitle.classList.remove("gifts__container-card-subtitle_green");

  switch (info[0].category) {
    case "For Work":
      img.src = "../images/GiftsSection/ball.png";
      subtitle.classList.add("gifts__container-card-subtitle_purple");
      break;
    case "For Harmony":
      img.src = "../images/GiftsSection/ball3.png";
      subtitle.classList.add("gifts__container-card-subtitle_pink");
      break;
    case "For Health":
      img.src = "../images/GiftsSection/ball2.png";
      subtitle.classList.add("gifts__container-card-subtitle_green");
      break;
  }
}

function generateSnowFlakes(info) {
  let liveFlakes = snowFlakes(info.live);
  let createFlakes = snowFlakes(info.create);
  let loveFlakes = snowFlakes(info.love);
  let dreamFlakes = snowFlakes(info.dream);

  applyStyleToExistingFlakes(liveFlakes, arrayListsFlakes[0]);
  applyStyleToExistingFlakes(createFlakes, arrayListsFlakes[1]);
  applyStyleToExistingFlakes(loveFlakes, arrayListsFlakes[2]);
  applyStyleToExistingFlakes(dreamFlakes, arrayListsFlakes[3]);
}

function snowFlakes(string) {
  if (string.includes("1")) {
    return 1;
  } else if (string.includes("2")) {
    return 2;
  } else if (string.includes("3")) {
    return 3;
  } else if (string.includes("4")) {
    return 4;
  } else if (string.includes("5")) {
    return 5;
  }
}

function applyStyleToExistingFlakes(count, ulElement) {
  const liElements = ulElement.querySelectorAll(".flake");

  for (let i = 0; i < count && i < liElements.length; i++) {
    liElements[i].classList.add("flake_red");
  }
  const remainingCount = 5 - count;
  for (
    let i = count;
    i < count + remainingCount && i < liElements.length;
    i++
  ) {
    liElements[i].classList.add("flake_trans");
  }
}

function openModal(target) {
  //по названию карточки найдем о ней информацию для модалки
  let parentElem = target.closest(".gifts__container-card");

  const title = parentElem.querySelector(".gifts__container-card-title");
  const cardInfo = getModalInfo(title.textContent);
  setModalInfo(modal, cardInfo);

  overlay.classList.add("overlay_show");
  body.classList.add("main_hidden");
}

//закрытие модалки по клику на оверлей
document.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("overlay")) {
    closeModalOnOverlay();
  }
});

//закрытие модалки по клику на оверлей
function closeModalOnOverlay() {
  overlay.classList.remove("overlay_show");
  body.classList.remove("main_hidden");
  const liElements = document.querySelectorAll(".flake");
  liElements.forEach((li) => {
    li.classList.remove("flake_red");
    li.classList.remove("flake_trans");
  });
}

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("overlay_show");
  body.classList.remove("main_hidden");
  const liElements = document.querySelectorAll(".flake");
  liElements.forEach((li) => {
    li.classList.remove("flake_red");
    li.classList.remove("flake_trans");
  });
});
