import { Cell } from "./cell.js";
import { bracket } from "./main.js";
import { traverseAllCells } from "./bracketData.js";
import { removeAllChildNodes, createElement } from "./utilities.js";
import { getIcon } from "./playButton.js";
import { handlePlayButton } from "./music.js";
import { displayBracketDescription } from "./description.js";

export function createBracketStructure(tracksData) {
  const container = document.querySelector(".container");
  const description = tracksData["description"];
  removeAllChildNodes(container);
  displayBracketDescription(description);
  const tracksLength = tracksData["tracks"].length;
  bracket.setStructure(tracksLength);
  const tracks = {
    left: tracksData["tracks"].slice(0, tracksLength / 2),
    right: tracksData["tracks"].slice(tracksLength / 2),
  };
  // calculate the number of rounds (sans final round)
  const numberOfRounds = Math.log2(tracksLength / 2) * 2;
  // set a variable for an amount of tracks per round
  let tracksPerRound = tracksLength / 2;
  const mainContainer = document.querySelector(".container");
  // create and append the main bracket div to 'container' container
  const tournamentBracket = document.createElement("div");
  tournamentBracket.classList.add("tournament-bracket");
  mainContainer.appendChild(tournamentBracket);

  for (let i = 0; i < numberOfRounds; i++) {
    const round = document.createElement("div");
    round.classList.add("round");
    if (i < numberOfRounds / 2) {
      var roundIndex = i;
      var side = "left";
    } else {
      var roundIndex = numberOfRounds - i - 1;
      var side = "right";
    }
    // add an appropriate class to the round specifying its index as well
    const roundClassName = `${side}-${roundIndex}`;
    round.classList.add(roundClassName);

    // add a cell to the 'round' div 'tracksPerRound' times
    for (let j = 0; j < tracksPerRound; j++) {
      const cellClassName = `${side}-${roundIndex}-${j}`;
      const cellClassNameTwo = `cell-${side}`;
      const cell = createElement("div", [
        "cell",
        cellClassName,
        cellClassNameTwo,
      ]);
      const songTitleElement = createElement("p", ["song-title"]);
      cell.appendChild(songTitleElement);
      const cellObject = new Cell(roundIndex, j, cell);
      cell.addEventListener("click", cellObject.advance.bind(cellObject));

      // distributes all the song across the first round cells on both sides of the bracket
      if (roundIndex === 0) {
        const previewURL = tracks[side][j]["spotify_preview_url"];
        if (previewURL) {
          const playIcon = getIcon("play");
          const playButton = createElement("button", [
            "play-button",
            "play-icon_standby",
          ]);
          playButton.appendChild(playIcon);
          playButton.dataset.status = "standby";
          playButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            handlePlayButton.bind(playButton)(previewURL);
          });
          cell.appendChild(playButton);
        }
        const trackTitle = tracks[side][j]["track_title"];
        const artistName = tracks[side][j]["artist_name"];
        const albumColors = tracks[side][j]["album_colors"];
        const textColor = tracks[side][j]["text_color"];
        console.log(trackTitle, artistName);
        cellObject.setCurrentSong(trackTitle);
        cellObject.setArtistName(artistName);
        cellObject.setElementText();
        cellObject.makeAdvanceable();
        cellObject.activate();

        cellObject.setTextColor(textColor);
        cellObject.setAlbumColors(albumColors);
        cellObject.applyColors();
      } else {
        cell.classList.add("cell_empty");
      }
      // fill the bracketData object will all the cell objects
      bracket[side][roundIndex][j] = cellObject;
      round.appendChild(cell);
    }

    // check if it's left or right side
    if (i < numberOfRounds / 2 - 1) {
      // half the number of tracks per round
      tracksPerRound /= 2;
    } else if (i > numberOfRounds / 2 - 1) {
      // multiply number of tracks per round by 2
      tracksPerRound *= 2;
    }
    tournamentBracket.appendChild(round);

    if (i === numberOfRounds / 2 - 1) {
      const finalRound = createFinalRound();
      tournamentBracket.appendChild(finalRound);
    }
  }
  traverseAllCells(bracket);
}

function createFinalRound() {
  const finalRound = createElement("div", ["round", "final-round"]);
  const winnerContainer = createElement("div", ["winner-container"]);
  const winnerCell = createElement("div", [
    "cell",
    "winner-cell",
    "cell_empty",
    "final-cell",
  ]);
  const songWinnerTitleElement = createElement("p", ["song-title"]);
  winnerCell.appendChild(songWinnerTitleElement);
  const winnerCellObject = new Cell(-2, 0, winnerCell);
  winnerCell.addEventListener(
    "click",
    winnerCellObject.advance.bind(winnerCellObject)
  );
  bracket.final["winner"] = winnerCellObject;
  winnerContainer.appendChild(winnerCell);

  finalRound.appendChild(winnerContainer);

  const finalists = createElement("div", ["finalists"]);
  const leftCell = createElement("div", [
    "cell",
    "left-final-cell",
    "final-cell",
    "cell_empty",
  ]);
  const songLeftTitleElement = createElement("p", ["song-title"]);
  leftCell.appendChild(songLeftTitleElement);
  const leftCellObject = new Cell(-1, 0, leftCell);
  leftCell.addEventListener(
    "click",
    leftCellObject.advance.bind(leftCellObject)
  );
  bracket.final["left"] = leftCellObject;
  const rightCell = createElement("div", [
    "cell",
    "right-final-cell",
    "final-cell",
    "cell_empty",
  ]);
  const songRightTitleElement = createElement("p", ["song-title"]);
  rightCell.appendChild(songRightTitleElement);
  const rightCellObject = new Cell(-1, 1, rightCell);
  rightCell.addEventListener(
    "click",
    rightCellObject.advance.bind(rightCellObject)
  );
  bracket.final["right"] = rightCellObject;
  finalists.appendChild(leftCell);
  finalists.appendChild(rightCell);

  finalRound.appendChild(finalists);
  return finalRound;
}
