export default function identifyPaySystem(value) {
  const num = String(value).replace(/\D/g, "");

  if (num.length !== 16) {
    throw new Error("Платежная система не определена");
  }

  const p1 = Number(num.slice(0, 1));
  const p2 = Number(num.slice(0, 2));
  const p3 = Number(num.slice(0, 3));
  const p4 = Number(num.slice(0, 4));

  if (p1 === 4) return "Visa";
  if ((p2 >= 51 && p2 <= 55) || (p4 >= 2221 && p4 <= 2720)) return "MasterCard";
  if (p4 >= 2200 && p4 <= 2204) return "Mir";
  if (p4 >= 3528 && p4 <= 3589) return "JCB";
  if (p2 === 65 || (p3 >= 644 && p3 <= 649) || p4 === 6011) return "Discover";
  if (p2 === 62) return "UnionPay";
  if (p1 === 6 || p2 === 50 || (p2 >= 56 && p2 <= 58)) return "Maestro";

  throw new Error("Платежная система не определена");
}
