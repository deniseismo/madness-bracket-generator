import tippy from "tippy.js";

// activate tooltips for share buttons
export function activateShareTooltips() {
  const twitterButton = document.querySelector(".button-twitter");
  const redditButton = document.querySelector(".button-reddit");
  const vkButton = document.querySelector(".button-vk");
  const facebookButton = document.querySelector(".button-facebook");
  const telegramButton = document.querySelector(".button-telegram");
  const copyButton = document.querySelector(".button-copy");
  const buttons = [
    twitterButton,
    redditButton,
    vkButton,
    facebookButton,
    telegramButton,
    copyButton,
  ];
  const titles = [
    "twitter",
    "reddit",
    "vk",
    "facebook",
    "telegram",
    "copy link",
  ];
  const titledButtons = buttons.map(function (element, index) {
    return [element, titles[index]];
  });
  titledButtons.forEach((group) => {
    tippy(group[0], {
      arrow: true,
      placement: "bottom",
      content: group[1],
    });
  });
  tippy(copyButton, {
    trigger: "click",
    content: "copied!",
    placement: "top",
    duration: [300, 500],
    onShown(instance) {
      instance.hide();
    },
  });
}
