import { createElement } from "../misc/utilities.js";

// show bracket description/title: artist's name/classics/charts/secret, etc.
export function displayBracketDescription(description) {
  const container = document.querySelector(".container");
  const descriptionContainer = createElement("div", ["description-container"]);
  const descriptionText = createElement("h1", ["description-text"]);
  descriptionText.textContent = description.toUpperCase();
  const hr = createElement("hr", ["description-line"]);
  descriptionContainer.append(descriptionText, hr);
  container.appendChild(descriptionContainer);
}
