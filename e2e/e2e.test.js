import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("FormWidjet", () => {
  let server = null;
  const baseUrl = "http://localhost:8091";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on("message", (msg) => msg === "ready" && resolve());
      server.on("error", reject);
      setTimeout(() => reject(new Error("Server start timeout")), 15000);
    });
  });

  afterAll(async () => {
    if (server) {
      server.kill();
      await new Promise((resolve) => server.on("exit", resolve));
    }
  });

  test("form input should add .valid class", async () => {
    await page.goto(baseUrl);

    const form = await page.$(".card-form-widjet");
    const input = await form.$(".input");
    const submit = await form.$(".submit");

    await input.type("2203113337561198");
    await submit.click();

    await page.waitForSelector(".card-form-widjet .input.valid", {
      timeout: 5000,
    });
  });

  test("should highlight Mir icon for Mir card", async () => {
    await page.goto(baseUrl);

    const form = await page.$(".card-form-widjet");
    const input = await form.$(".input");
    const submit = await form.$(".submit");

    await input.type("2203113337561198");
    await submit.click();

    // Ждём, пока появится выделенная картинка
    await page.waitForSelector(".icon-card.selected", { timeout: 5000 });
    // Проверяем, что выделена именно Mir
    const selectedSystem = await page.$eval(
      ".icon-card.selected",
      (el) => el.dataset.system,
    );
    expect(selectedSystem).toBe("Mir");

    // Проверяем, что выделена ровно одна картинка
    const selectedCount = await page.$$eval(
      ".icon-card.selected",
      (els) => els.length,
    );
    expect(selectedCount).toBe(1);
  });

  test("should not highlight any icon for invalid card", async () => {
    await page.goto(baseUrl);

    const form = await page.$(".card-form-widjet");
    const input = await form.$(".input");
    const submit = await form.$(".submit");

    await input.type("1234567890123456"); // невалидный
    await submit.click();

    // Ждём появления класса invalid
    await page.waitForSelector(".card-form-widjet .input.invalid", {
      timeout: 5000,
    });

    // Проверяем, что ни одна картинка не выделена
    const selectedCount = await page.$$eval(
      ".icon-card.selected",
      (els) => els.length,
    );
    expect(selectedCount).toBe(0);
  });
});
