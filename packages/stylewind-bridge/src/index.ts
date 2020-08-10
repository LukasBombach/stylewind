import { getTailWindClassNames } from "./getTailWindCss";

getTailWindClassNames().then(classNames => {
  const identifiers = classNames
    .filter(className => !/^(sm|md|lg|xl):/.test(className))
    .filter(className => !/^(focus|hover):/.test(className))
    .filter(className => !/^-/.test(className))
    .map(className => className.replace(/^([^-]+).*/, "$1"))
    .filter((className, i, arr) => arr.indexOf(className) === i);

  const responsive = classNames
    .filter(className => /^(sm|md|lg|xl):/.test(className))
    .map(className => className.replace(/^(sm|md|lg|xl):(.*)/, "$2"));

  const focus = classNames
    .filter(className => /^focus:/.test(className))
    .map(className => className.replace(/^focus:(.*)/, "$1"));

  const hover = classNames
    .filter(className => /^hover:/.test(className))
    .map(className => className.replace(/^hover:(.*)/, "$1"));

  console.log(identifiers.length, "/", classNames.length);
  console.log("identifiers", identifiers);
  console.log("responsive", responsive);
  console.log("focus", focus);
  console.log("hover", hover);
});
