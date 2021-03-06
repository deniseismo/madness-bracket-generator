import { createElement } from "../misc/utilities.js";
import { appIconsSVGData } from "../misc/appIcons.js";
import { shareButtonSVGData } from "./shareButtons.js";
import { getSVGIcon } from "../misc/svgGenerator.js";
import { socialShareInit } from "./socials/socials.js";
import Clipboard from "clipboard";
import { activateShareTooltips } from "./shareTooltips.js";
import MicroModal from "micromodal";
// create modal window
function createModal() {
  const mainModalContainer = createElement("div", [
    "modal",
    "micromodal-slide",
  ]);
  mainModalContainer.id = "modal-1";
  mainModalContainer.setAttribute("aria-hidden", "true");
  const overlayModalContainer = createElement("div", ["modal__overlay"]);
  overlayModalContainer.setAttribute("tab-index", "-1");
  overlayModalContainer.setAttribute("data-micromodal-close", "");

  mainModalContainer.appendChild(overlayModalContainer);
  const dialogModalContainer = createElement("div", ["modal__container"]);
  dialogModalContainer.setAttribute("role", "dialog");
  dialogModalContainer.setAttribute("aria-modal", "true");
  dialogModalContainer.setAttribute("aria-labelledby", "modal-1-title");
  overlayModalContainer.appendChild(dialogModalContainer);

  const header = createElement("header", ["modal__header"]);
  const modalTitle = createElement("h2", ["modal__title"]);
  modalTitle.id = "modal-1-title";
  modalTitle.textContent = "share your bracket";
  const closeButton = createElement("button", ["modal__close", "button-close"]);
  closeButton.setAttribute("aria-label", "Close modal");
  closeButton.setAttribute("data-micromodal-close", "");
  const closeIcon = getSVGIcon(appIconsSVGData["close"]);
  closeIcon.classList.add("close-icon");
  closeButton.appendChild(closeIcon);

  header.append(modalTitle, closeButton);
  const modalContent = createElement("div", ["modal__content"]);
  modalContent.id = "modal-1-content";
  const shareLinkContainer = createShareLinkContainer();
  const socialMediaButtons = createSocialMediaButtons();
  modalContent.append(shareLinkContainer, socialMediaButtons);
  dialogModalContainer.append(header, modalContent);
  clipboardInit();
  return mainModalContainer;
}

// creates a container with a share link and a copy button
function createShareLinkContainer() {
  const shareLinkContainer = createElement("div", ["share-link-container"]);
  const shareLinkField = createElement("input", ["share-link"]);
  shareLinkField.addEventListener("click", () => {
    shareLinkField.select();
  });
  const copyButton = createElement("button", ["button-copy", "button-social"]);
  copyButton.dataset.clipboardTarget = ".share-link";
  const copyIcon = getSVGIcon(shareButtonSVGData["copy"]);
  copyIcon.classList.add("copy-icon");
  copyButton.appendChild(copyIcon);
  shareLinkContainer.append(shareLinkField, copyButton);
  return shareLinkContainer;
}

// creates a container with social media buttons
function createSocialMediaButtons() {
  const socialMediaButtonsContainer = createElement("div", [
    "social-media-container",
  ]);
  const twitterButton = createElement("a", ["button-twitter", "button-social"]);
  const twitterIcon = getSVGIcon(shareButtonSVGData["twitter"]);
  twitterIcon.classList.add("social-media-icon");
  twitterButton.appendChild(twitterIcon);

  const vkButton = createElement("a", ["button-vk", "button-social"]);
  const vkIcon = getSVGIcon(shareButtonSVGData["vk"]);
  vkIcon.classList.add("social-media-icon");
  vkButton.appendChild(vkIcon);

  const telegramButton = createElement("a", [
    "button-telegram",
    "button-social",
  ]);
  const telegramIcon = getSVGIcon(shareButtonSVGData["telegram"]);
  telegramIcon.classList.add("social-media-icon");
  telegramButton.appendChild(telegramIcon);

  const redditButton = createElement("a", ["button-reddit", "button-social"]);
  const redditIcon = getSVGIcon(shareButtonSVGData["reddit"]);
  redditIcon.classList.add("social-media-icon");
  redditButton.appendChild(redditIcon);

  const facebookButton = createElement("a", [
    "button-facebook",
    "button-social",
  ]);
  const facebookIcon = getSVGIcon(shareButtonSVGData["facebook"]);
  facebookIcon.classList.add("social-media-icon");
  facebookButton.appendChild(facebookIcon);

  socialMediaButtonsContainer.append(
    twitterButton,
    vkButton,
    telegramButton,
    redditButton,
    facebookButton
  );
  return socialMediaButtonsContainer;
}

// adds a modal to the container element
export function addModal() {
  console.log("add modal triggered!");
  const modal = createModal();
  const mainContainer = document.querySelector(".main");
  mainContainer.append(modal);
  activateShareTooltips();
}

// instantiate Clipboard by passing a button-copy selector
function clipboardInit() {
  new Clipboard(".button-copy");
}

export function shareModalInit(shareURL, description) {
  shareLinkInit(shareURL);
  socialShareInit(shareURL, description);
  MicroModal.show("modal-1");
}

function shareLinkInit(shareURL) {
  const shareLinkElement = document.querySelector(".share-link");
  shareLinkElement.value = shareURL;
}
