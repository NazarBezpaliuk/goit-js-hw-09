import '../css/common.css';

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStart.style.backgroundColor = 'green';
btnStop.style.backgroundColor = 'red';


btnStop.disabled = true;
const TIMER = 1000;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', changeBgColor);

function changeBgColor() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  intervalId = setInterval(() => {
    let bgColor = `${getRandomHexColor()}`;
    bodyEl.style.backgroundColor = bgColor;
  }, TIMER);

  btnStop.addEventListener('click', stopChangeBgColor);

  function stopChangeBgColor() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(intervalId);
  }
}
