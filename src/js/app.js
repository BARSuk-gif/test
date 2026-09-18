import FormWidjet from "./widjet.js";

const container = document.querySelector(".container");
const form = new FormWidjet(container);

form.bindToDom();
