/**
 * @jest-environment jsdom
 */

import FormWidjet from "../widjet.js";

test("should render", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const form = new FormWidjet(container);

  form.bindToDom();

  expect(container.innerHTML).toEqual(FormWidjet.markup);
});

test("should add valid class", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const form = new FormWidjet(container);

  form.bindToDom();

  form.input.value = "4051 0998 6077 9533";
  form.submit.click();

  expect(form.input.classList.contains("valid")).toEqual(true);

  const selectedIcon = form.element.querySelector(".icon-card.selected");
  expect(selectedIcon).not.toBeNull();
  expect(selectedIcon.dataset.system).toBe("Visa");

  const selectedCount = form.element.querySelectorAll(
    ".icon-card.selected",
  ).length;
  expect(selectedCount).toBe(1);
});

test("should add invalid class", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const form = new FormWidjet(container);

  form.bindToDom();

  form.input.value = "1234567890123456";
  form.submit.click();

  expect(form.input.classList.contains("invalid")).toEqual(true);

  const selectedIcon = form.element.querySelector(".icon-card.selected");
  expect(selectedIcon).toBeNull();
  // expect(selectedIcon.dataset.system).toBe('Visa');

  const selectedCount = form.element.querySelectorAll(
    ".icon-card.selected",
  ).length;
  expect(selectedCount).toBe(0);
});
