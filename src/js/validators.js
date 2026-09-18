export default class ValidNumberCard {
  constructor(value) {
    this.value = String(value).replace(/\D/g, "");
  }

  get checkDigit() {
    return Number(this.value[this.value.length - 1]);
  }

  isValidNum() {
    // 1. Отбрасываем контрольную цифру — получаем полезную нагрузку
    const payload = this.value.slice(0, -1);

    // 2. Разворачиваем справа налево
    const digits = payload.split("").reverse().map(Number);

    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if ((i + 1) % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
    }

    const controlDigit = (10 - (sum % 10)) % 10;
    // console.log(controlDigit);

    return controlDigit === this.checkDigit;
  }
}
