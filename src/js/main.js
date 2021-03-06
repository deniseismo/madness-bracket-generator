import { BracketData } from "./bracket/bracketData.js";
import { createBracketStructure } from "./bracket/bracketStructure.js";
import { introAnimation } from "./animation/introAnimation.js";
import { createIntroElements } from "./visuals/intro.js";
import { addModal } from "./share/shareModal.js";
import { OptionStorage } from "./options/optionStorage.js";
import {
  handleSquareButtons,
  handleMaxBracketSizeOption,
} from "./options/optionHandlers.js";
import { fetchTracks, pushHistory } from "./fetchTracks.js";
import { showSpinner, hideSpinner } from "./visuals/spinner.js";
import { handleResponsiveness } from "./responsiveness/mediaQuery.js";
import {
  setupAutocomplete,
  handleAutocomplete,
} from "./autocomplete/autocomplete.js";
import {
  getQueryStringFromUserInput,
  setUserInputForSubmission,
} from "./options/inputHandlers.js";
import { removeFlashMessages } from "./messages/messages.js";

export let bracket = new BracketData();

export let options = new OptionStorage();

document.querySelector(".form__group").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  setUserInputForSubmission(options);
  showSpinner();
  fetchTracks(options)
    .then((data) => {
      hideSpinner();
      try {
        if (data) {
          const bracketType = options.getCurrentBracketType();
          const name = options.getInputValue();
          const limit = options.getBracketMaxSize();
          const queryString = getQueryStringFromUserInput(options);
          options.setCurrentTracks(data["tracks"]);
          options.setDescription(data["description"]);
          options.setExtra(data["extra"]);
          createBracketStructure(bracket, options);
          addModal();
          handleResponsiveness();
          pushHistory({
            state: {
              bracketType: bracketType,
              name: name,
              limit: limit,
            },
            title: null,
            url: `${bracketType}?` + queryString,
          });
        } else {
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
}

setupAutocomplete(options);
handleAutocomplete("#autoComplete");
handleAutocomplete("#autoComplete2");

createIntroElements();
introAnimation();
handleSquareButtons(options);
handleMaxBracketSizeOption(options);
removeFlashMessages();
