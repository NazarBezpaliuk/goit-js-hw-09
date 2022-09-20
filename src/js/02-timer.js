import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.style.backgroundColor = 'green';

const TIMER_INTERVAL = 1000;
refs.btn.disabled = true;
refs.btn.addEventListener('click', onTimerBtnClick);
let choosenDate = null;
function onTimerBtnClick() {
    timer.start();
    refs.btn.disabled = true;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenDate = selectedDates[0];
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btn.disabled = false;
    return;
  },
};

flatpickr(refs.input, options);

function updateDays({ days }) {
  refs.days.textContent = `${days}`;
}
function updateHours({ hours }) {
  refs.hours.textContent = `${hours}`;
}
function updateMinutes({ minutes }) {
  refs.mins.textContent = `${minutes}`;
}
function updateSeconds({ seconds }) {
  refs.seconds.textContent = `${seconds}`;
}

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = choosenDate;
    this.isActive = true;
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime < 999) {
        clearInterval(timerInterval);
      }
      const time = convertMs(deltaTime);

      updateDays(time);
      updateHours(time);
      updateMinutes(time);
      updateSeconds(time);
    }, TIMER_INTERVAL);
  },
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}