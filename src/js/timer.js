//переменные таймера
const timerContainer = document.querySelector("cta__container-timer");
const daysVar = document.querySelector("#days");
const hoursVar = document.querySelector("#hours");
const minsVar = document.querySelector("#minutes");
const secsVar = document.querySelector("#seconds");

const newYearDate = new Date(2026, 0);

function getActualTimeToNewYearDate() {
  //разница до НГ в секундах
  let diffToNewYearDateSec = (newYearDate - Date.now()) / 1000;
  return {
    days: Math.floor(diffToNewYearDateSec / (60 * 60 * 24)),
    hours: Math.floor((diffToNewYearDateSec % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((diffToNewYearDateSec % (60 * 60)) / 60),
    seconds: Math.floor(diffToNewYearDateSec % 60),
  };
}

function formatDate(num) {
  let strNum = num.toString();
  if (strNum.length < 2) {
    strNum = "0" + strNum;
  }
  return strNum;
}

setInterval(() => {
  let timeObj = getActualTimeToNewYearDate();

  let days = formatDate(timeObj.days);
  let hours = formatDate(timeObj.hours);
  let min = formatDate(timeObj.minutes);
  let sec = formatDate(timeObj.seconds);
  daysVar.textContent = days;
  hoursVar.textContent = hours;
  minsVar.textContent = min;
  secsVar.textContent = sec;
}, 1000);
