export default class Key {
  constructor(defaultLanguage, eventCode, rus, capsrus, eng, capseng) {
    this.defaultLanguage = defaultLanguage;
    this.eventCode = eventCode;
    this.rus = rus;
    this.eng = eng;
    this.capsrus = capsrus;
    this.capseng = capseng;
  }

  createKeyComponent() {
    const DIV = document.createElement('div');
    DIV.classList.add(`${this.eventCode}`);
    Object.keys(this)
      .slice(2)
      .forEach((e) => {
        const SPAN = document.createElement('span');
        SPAN.innerHTML = `${this[e]}`;
        SPAN.classList.add(`${e}`);
        if (e !== this.defaultLanguage) {
          SPAN.classList.add('none');
        }
        DIV.append(SPAN);
      });

    return DIV;
  }
}
