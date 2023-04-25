export default class Key {
  constructor(eventCode, rus, capsrus, eng, capseng) {
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
      .slice(1)
      .forEach((e) => {
        const SPAN = document.createElement('span');
        SPAN.innerHTML = `${this[e]}`;
        SPAN.classList.add(`${e}`);
        DIV.append(SPAN);
      });

    return DIV;
  }
}
