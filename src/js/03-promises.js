import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', onBtnSubmitClick);

function onBtnSubmitClick(event) {
  event.preventDefault();

  let firstDelay = Number(delay.value);
  let stepDelay = Number(step.value);
  let amountEl = Number(amount.value);

  for (let i = 0; i < amountEl; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    firstDelay += stepDelay;
  }
}
