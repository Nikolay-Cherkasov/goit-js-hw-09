import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timePicker: document.querySelector('input[type="text"]'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const { timePicker } = refs;
let timerId = null;

function countDiffTime(futureTime, nowTime, callback) {
  let diff = 0;

  diff = futureTime - nowTime;

  callback(diff);
}

function convertMs(ms) {
  if (ms < 250) {
    return clearInterval(timerId);
  }
  // Number of milliseconds per unit of time

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  minDate: new Date(),
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < options.defaultDate) {
      refs.btnStart.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.btnStart.disabled = false;

    refs.btnStart.addEventListener('click', () => {
      refs.btnStart.disabled = true;

      timerId = setInterval(() => {
        countDiffTime(selectedDates[0], new Date(), convertMs);
      }, 1000);
    });
  },
};
flatpickr(timePicker, options);
