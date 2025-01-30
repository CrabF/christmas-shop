const main = document.querySelector(".main");

const scrollBtn = document.createElement("div");
scrollBtn.classList.add("scrollBtn");

const img = document.createElement("img");
img.src = "./images/PageGifts/arrowUp.svg";
img.alt = "";

scrollBtn.appendChild(img);

main.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 300 && screen.width <= 768) {
    scrollBtn.classList.add("scrollBtn_show");
  } else {
    scrollBtn.classList.remove("scrollBtn_show");
  }
});
