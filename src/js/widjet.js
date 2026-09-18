import mirImg from "../img/mir.png";
import visaImg from "../img/visa.png";
import masterCardImg from "../img/masterCard.png";
import jcbImg from "../img/jcb.png";
import maestroImg from "../img/maestro.png";
import discoverImg from "../img/discover.png";
import unionPayImg from "../img/unionpay.png";
import ValidNumberCard from "./validators";
import identifyPaySystem from "./identifyPaySystem";

export default class FormWidjet {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
      <form class="card-form-widjet">
        <div class="card-control">
          <div class="pay-icon">
            <img src="${mirImg}" alt="mir card" data-system="Mir" class="icon-card">
            <img src="${visaImg}" alt="visa card" data-system="Visa" class="icon-card">
            <img src="${masterCardImg}" alt="masterCard" data-system="MasterCard" class="icon-card">
            <img src="${jcbImg}" alt="jcb card" data-system="JCB" class="icon-card">
            <img src="${maestroImg}" alt="maestro card" data-system="Maestro" class="icon-card">
            <img src="${discoverImg}" alt="discover card" data-system="Discover" class="icon-card">
            <img src="${unionPayImg}" alt="unionPay card" data-system="UnionPay" class="icon-card">
          </div>
          <input class="input" data-id="card-number-input" type="text">
          <button class="submit" data-id="card-validate">Click to Validate</button>
        </div>    
      </form>
    `;
  }

  static get selector() {
    return ".card-form-widjet";
  }

  static get inputSelector() {
    return ".input";
  }

  static get submitSelector() {
    return ".submit";
  }

  bindToDom() {
    this.parentEl.innerHTML = FormWidjet.markup;

    this.element = this.parentEl.querySelector(FormWidjet.selector);
    this.submit = this.element.querySelector(FormWidjet.submitSelector);
    this.input = this.element.querySelector(FormWidjet.inputSelector);

    this.element.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    const value = this.input.value;
    const validNumber = new ValidNumberCard(value);

    this.element
      .querySelectorAll(".icon-card")
      .forEach((icon) => icon.classList.remove("selected"));

    if (validNumber.isValidNum()) {
      this.input.classList.remove("invalid");
      this.input.classList.add("valid");

      let system;
      try {
        system = identifyPaySystem(value);
      } catch (err) {
        this.input.classList.remove("valid");
        this.input.classList.add("invalid");
        console.log(err);
        return;
      }

      // Подсвечиваем нужную
      const target = this.element.querySelector(
        `.icon-card[data-system="${system}"]`,
      );
      if (target) target.classList.add("selected");
    } else {
      this.input.classList.remove("valid");
      this.input.classList.add("invalid");
    }
  }
}
