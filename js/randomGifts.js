const containers = document.querySelectorAll(".gifts__container-card");

let gifts = [];
const randomNums = [];
const randomGifts = [];
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

//получение рандомных чисел из массива с подарками
function setRandomNums() {
  let max = gifts.length;
  let min = 0;
  let val = Math.floor(Math.random() * (max - min));
  let val1 = Math.floor(Math.random() * (max - min));
  let val2 = Math.floor(Math.random() * (max - min));
  let val3 = Math.floor(Math.random() * (max - min));
  randomNums.push(val);
  randomNums.push(val1);
  randomNums.push(val2);
  randomNums.push(val3);
}

//используем рандомные карточки, чтобы изменить контент
function setRandomGifts(gifts) {
  let counter = 0;
  while (counter < gifts.length) {
    Array.from(containers).forEach((container) => {
      const subtitle = container.querySelector(
        ".gifts__container-card-subtitle"
      );
      const img = container.querySelector(".gifts__container-card-image");
      const title = container.querySelector(".gifts__container-card-title");
      subtitle.textContent = gifts[counter].category;
      title.textContent = gifts[counter].name;
      switch (gifts[counter].category) {
        case "For Work":
          img.src = "./images/GiftsSection/ball.png";
          subtitle.classList.add("gifts__container-card-subtitle_purple");
          break;
        case "For Harmony":
          img.src = "./images/GiftsSection/ball3.png";
          subtitle.classList.add("gifts__container-card-subtitle_pink");
          break;
        case "For Health":
          img.src = "./images/GiftsSection/ball2.png";
          subtitle.classList.add("gifts__container-card-subtitle_green");
          break;
      }
      counter++;
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    setRandomNums();
    randomNums.forEach((num) => {
      randomGifts.push(gifts[num]);
    });
    setRandomGifts(randomGifts);
  }, 500);
});
