import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnSubmit: document.querySelector('button'),
  form: document.querySelector('.form'),
  formDelay: document.querySelector('input[name="delay"]'),
  formStep: document.querySelector('input[name="step"]'),
  formAmount: document.querySelector('input[name="amount"]'),
};
refs.btnSubmit.style.backgroundColor = 'green';

refs.btnSubmit.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  const firstDelay = Number(refs.formDelay.value);
  const delayStep = Number(refs.formStep.value);
  const amount = Number(refs.formAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay + (i - 1) * delayStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
