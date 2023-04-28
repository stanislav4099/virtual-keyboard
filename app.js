import Key from './components/keysComponent.js';
import {
  EVENT_CODE,
  ENG_KEY,
  ENG_KEY_CAPS,
  RUS_KEY,
  RUS_KEY_CAPS,
} from './components/keys.js';

const BODY = document.querySelector('body');
const NUMBER_OF_KEYS = 64;
let keyArr = null;
let key = null;

const animEnd = (e) => {
  if (e.type === 'mouseup') {
    key.classList.remove('key-animation');
    window.removeEventListener('mouseup', animEnd);
  } else if (e.type === 'keyup') {
    const KEY_CODE = e.code;
    keyArr.forEach((element) => {
      if (element.classList.contains(`${KEY_CODE}`)) {
        element.classList.remove('key-animation');
      }
    });
  }
};

const keyAnimation = (e) => {
  if (e.type === 'mousedown') {
    key = e.target.closest('div');
    if (key.classList.contains('key-container')) {
      return;
    }
    key.classList.add('key-animation');
    window.addEventListener('mouseup', animEnd);
  } else if (e.type === 'keydown') {
    const KEY_CODE = e.code;
    [key] = keyArr.filter((element) => element.className === KEY_CODE);
    if (!key) {
      return;
    }
    key.classList.add('key-animation');
  }
};

const createKeyBoardComponent = () => {
  const KEY_ARR = new Array(NUMBER_OF_KEYS).fill(null);

  for (let i = 0; i < NUMBER_OF_KEYS; i += 1) {
    KEY_ARR[i] = new Key(
      EVENT_CODE[i],
      RUS_KEY[i],
      RUS_KEY_CAPS[i],
      ENG_KEY[i],
      ENG_KEY_CAPS[i],
    );
  }

  const WRAPPER = document.createElement('div');
  WRAPPER.classList.add('wrapper');

  const TEXTAERA = document.createElement('textarea');
  TEXTAERA.classList.add('textarea');

  const KEY_CONTAINER = document.createElement('div');
  KEY_CONTAINER.classList.add('key-container');

  KEY_ARR.forEach((e) => KEY_CONTAINER.append(e.createKeyComponent()));

  WRAPPER.append(TEXTAERA);
  WRAPPER.append(KEY_CONTAINER);

  BODY.append(WRAPPER);

  keyArr = [...KEY_CONTAINER.childNodes];

  KEY_CONTAINER.addEventListener('mousedown', keyAnimation);
  window.addEventListener('keydown', keyAnimation);
  window.addEventListener('keyup', animEnd);
};

createKeyBoardComponent();
