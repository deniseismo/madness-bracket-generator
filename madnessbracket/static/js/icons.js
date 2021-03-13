const icons = {
  play: {
    path: {
      d:
        "M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32",
    },
  },
  pause: {
    path: {
      d: "M176 96h16v320h-16zM320 96h16v320h-16z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32",
    },
  },
};

export function getIcon(iconType) {
  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.classList.add("play-icon");
  svgIcon.setAttribute("viewBox", "0 0 512 512");
  const aPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const pathProperties = icons[iconType].path;
  for (const prop in pathProperties) {
    aPath.setAttributeNS(null, prop, pathProperties[prop]);
  }
  svgIcon.appendChild(aPath);
  return svgIcon;
}
