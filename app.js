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
const CHANGE_REGISTER_BUTTONS = ['ShiftLeft', 'ShiftRight', 'CapsLock'];
const EXIT_KEY = [
  'AltLeft',
  'AltRight',
  'ControlLeft',
  'ControlRight',
  'MetaLeft',
];

let keyArr = null;
let key = null;
let textArea = null;
let defaultLanguage = 'eng';
let carriageLocation = 0;
let inputKeyboard = false;
let isShift = false;
let shiftDown = false;

const enterInTextArea = () => {
  const TEXT_ARR = [...textArea.value];

  if (inputKeyboard
    || EXIT_KEY.includes(`${key.classList[0]}`)) {
    return;
  }
  if (key.classList.contains('Backspace')) {
    const TEMP_KEY = TEXT_ARR[carriageLocation - 1];
    if (!TEMP_KEY) {
      return;
    }
    textArea.value = '';
    TEXT_ARR.splice(carriageLocation - 1, 1);
    textArea.value = TEXT_ARR.join('');
    carriageLocation -= TEMP_KEY.length;
  } else if (key.classList.contains('Delete')) {
    const TEMP_KEY = TEXT_ARR[carriageLocation];
    if (!TEMP_KEY) {
      return;
    }
    textArea.value = '';
    TEXT_ARR.splice(carriageLocation, 1);
    textArea.value = TEXT_ARR.join('');
  } else if (key.classList.contains('Tab')) {
    textArea.value = '';
    TEXT_ARR.splice(carriageLocation, 0, '  ');
    textArea.value = TEXT_ARR.join('');
    carriageLocation += 2;
  } else if (key.classList.contains('Enter')) {
    textArea.value = '';
    TEXT_ARR.splice(carriageLocation, 0, '\n');
    textArea.value = TEXT_ARR.join('');
    carriageLocation += 1;
  } else {
    key.childNodes.forEach((e) => {
      if (!e.classList.contains('none')) {
        textArea.value = '';
        TEXT_ARR.splice(carriageLocation, 0, e.innerHTML);
        textArea.value = TEXT_ARR.join('');
        carriageLocation += e.innerHTML.length;
      }
    });
  }
};

const switchingLanguage = () => {
  keyArr.forEach((e) => {
    e.childNodes.forEach((i) => {
      if (i.classList.contains(`${defaultLanguage}`)) {
        i.classList.remove('none');
      } else {
        i.classList.add('none');
      }
    });
  });
};

const shiftAndCapsHandler = () => {
  if (!isShift) {
    keyArr.forEach((e) => {
      const CHILD = e.childNodes;
      CHILD.forEach((elem) => {
        if (elem.classList.contains(`caps${defaultLanguage}`)) {
          elem.classList.remove('none');
        } else {
          elem.classList.add('none');
        }
      });
    });
    isShift = true;
  } else {
    keyArr.forEach((e) => {
      const CHILD = e.childNodes;
      CHILD.forEach((elem) => {
        if (elem.classList.contains(`${defaultLanguage}`)) {
          elem.classList.remove('none');
        } else {
          elem.classList.add('none');
        }
      });
    });
    isShift = false;
  }
};

const ShiftCapsEndAnimHadler = () => {
  if (
    key.classList.contains('ShiftLeft')
    || key.classList.contains('ShiftRight')
  ) {
    const S_LEFT = document.querySelector('.ShiftLeft');
    const S_RIGHT = document.querySelector('.ShiftRight');
    S_LEFT.classList.remove('key-animation');
    S_RIGHT.classList.remove('key-animation');
    shiftAndCapsHandler();
    shiftDown = !shiftDown;
  } else if (key.classList.contains('CapsLock')) {
    key.classList.toggle('key-animation');
    shiftAndCapsHandler();
  }
};

const ShiftCapsAnimHadler = () => {
  if (key.classList.contains('CapsLock')) {
    return;
  }
  if (
    (key.classList.contains('ShiftLeft')
    || key.classList.contains('ShiftRight'))
    && !shiftDown
  ) {
    const S_LEFT = document.querySelector('.ShiftLeft');
    const S_RIGHT = document.querySelector('.ShiftRight');
    S_LEFT.classList.add('key-animation');
    S_RIGHT.classList.add('key-animation');
    shiftAndCapsHandler();
    shiftDown = !shiftDown;
  }
};

const animEnd = (e) => {
  if (e.type === 'mouseup') {
    window.removeEventListener('mouseup', animEnd);
  } else if (e.type === 'keyup') {
    keyArr.forEach((element) => {
      if (element.classList.contains(`${e.code}`)) {
        key = element;
      }
    });
  }
  if (CHANGE_REGISTER_BUTTONS.includes(`${key.classList[0]}`)) {
    ShiftCapsEndAnimHadler();
    return;
  }
  key.classList.remove('key-animation');
};

const keyAnimation = (e) => {
  if (
    ((e.code === 'AltLeft'
    || e.code === 'AltRight') && e.ctrlKey)
    || ((e.code === 'ControlLeft'
    || e.code === 'ControlRight') && e.altKey)
  ) {
    if (defaultLanguage === 'eng') {
      defaultLanguage = 'rus';
    } else {
      defaultLanguage = 'eng';
    }
    switchingLanguage();
  }
  if (e.type === 'mousedown') {
    key = e.target.closest('div');
    if (key.classList.contains('key-container')) {
      return;
    }
    window.addEventListener('mouseup', animEnd);
  } else if (e.type === 'keydown') {
    [key] = keyArr.filter((element) => element.classList.contains(`${e.code}`));
  }
  if (CHANGE_REGISTER_BUTTONS.includes(`${key.classList[0]}`)) {
    ShiftCapsAnimHadler();
    return;
  }
  if (!inputKeyboard) {
    e.preventDefault();
  }
  key.classList.add('key-animation');
  enterInTextArea(key);
};

const createKeyBoardComponent = () => {
  const KEY_ARR = new Array(NUMBER_OF_KEYS).fill(null);

  for (let i = 0; i < NUMBER_OF_KEYS; i += 1) {
    KEY_ARR[i] = new Key(
      defaultLanguage,
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
  textArea = TEXTAERA;

  const KEY_CONTAINER = document.createElement('div');
  KEY_CONTAINER.classList.add('key-container');

  KEY_ARR.forEach((e) => KEY_CONTAINER.append(e.createKeyComponent()));

  WRAPPER.append(TEXTAERA);
  WRAPPER.append(KEY_CONTAINER);

  BODY.append(WRAPPER);

  keyArr = [...KEY_CONTAINER.childNodes];

  KEY_CONTAINER.addEventListener('mousedown', keyAnimation);
  TEXTAERA.addEventListener('focus', () => {
    inputKeyboard = true;
  });
  TEXTAERA.addEventListener('blur', () => {
    inputKeyboard = false;
    carriageLocation = TEXTAERA.selectionStart;
  });
  window.addEventListener('keydown', keyAnimation);
  window.addEventListener('keyup', animEnd);
};

createKeyBoardComponent();
