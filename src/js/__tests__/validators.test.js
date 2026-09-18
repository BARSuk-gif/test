import ValidNumberCard from "../validators.js";
import identifyPaySystem from "../identifyPaySystem.js";

describe("ValidNumberCard", () => {
  test.each([
    ["2203113337561198", 8, "Mir", true],
    ["4051 0998 6077 9533", 3, "Visa", true],
    ["2283773255606646", 6, "MasterCard", true],
    ["3584910167924610", 0, "JCB", false],
    ["3584910167924615", 5, "JCB", true],
    ["6759095157596036", 6, "Maestro", true],
    ["6498648493049277", 7, "Discover", true],
    ["6294986237001570", 0, "UnionPay", true],
  ])(
    "number %s → %s, check digit %d",
    (cardNumber, controlNumber, paySystem, expected) => {
      const validNum = new ValidNumberCard(cardNumber);
      expect(validNum.checkDigit).toBe(controlNumber);
      expect(validNum.isValidNum()).toBe(expected);
      expect(identifyPaySystem(cardNumber)).toBe(paySystem);
      expect(() => identifyPaySystem(cardNumber)).not.toThrow();
    },
  );

  test("17-digit number → error", () => {
    expect(() => identifyPaySystem("62949862370015750")).toThrow();
  });
});
