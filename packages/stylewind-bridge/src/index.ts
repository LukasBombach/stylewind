import { getTailWindClassNames } from "./getTailWindCss";

const PROP = "export type CanBeArray<T> = T | T[];";

/*
"md:hover:bg"?: PropValue<"black" | "blue-100" | "blue-200" | "blue-300" | "blue-400" | "blue-500" | "blue-600" | "blue-700" | "blue-800" | "blue-900" | "current" | "gray-100" | "gray-200" | "gray-300" | "gray-400" | "gray-500" | "gray-600" | "gray-700" | "gray-800" | "gray-900" | "green-100" | "green-200" | "green-300" | "green-400" | "green-500" | "green-600" | "green-700" | "green-800" | "green-900" | "indigo-100" | "indigo-200" | "indigo-300" | "indigo-400" | "indigo-500" | "indigo-600" | "indigo-700" | "indigo-800" | "indigo-900" | "opacity-0" | "opacity-100" | "opacity-25" | "opacity-50" | "opacity-75" | "orange-100" | "orange-200" | "orange-300" | "orange-400" | "orange-500" | "orange-600" | "orange-700" | "orange-800" | "orange-900" | "pink-100" | "pink-200" | "pink-300" | "pink-400" | "pink-500" | "pink-600" | "pink-700" | "pink-800" | "pink-900" | "purple-100" | "purple-200" | "purple-300" | "purple-400" | "purple-500" | "purple-600" | "purple-700" | "purple-800" | "purple-900" | "red-100" | "red-200" | "red-300" | "red-400" | "red-500" | "red-600" | "red-700" | "red-800" | "red-900" | "teal-100" | "teal-200" | "teal-300" | "teal-400" | "teal-500" | "teal-600" | "teal-700" | "teal-800" | "teal-900" | "transparent" | "white" | "yellow-100" | "yellow-200" | "yellow-300" | "yellow-400" | "yellow-500" | "yellow-600" | "yellow-700" | "yellow-800" | "yellow-900">;


bg: ["blue-100", "md:gray-100", "hover:green-100"]
text: ["sm", "gray-700"],
p: ["sm:10", "md:20"]
*/

getTailWindClassNames().then(classNames => {
  // const identifiers = classNames
  //   .filter(className => !/^(sm|md|lg|xl):/.test(className))
  //   .filter(className => !/^(focus|hover):/.test(className))
  //   .filter(className => !/^-/.test(className))
  //   .map(className => className.replace(/^([^-]+).*/, "$1"))
  //   .filter((className, i, arr) => arr.indexOf(className) === i);
  //
  // const responsive = classNames
  //   .filter(className => /^(sm|md|lg|xl):/.test(className))
  //   .map(className => className.replace(/^(sm|md|lg|xl):(.*)/, "$2"));
  //
  // const focus = classNames
  //   .filter(className => /^focus:/.test(className))
  //   .map(className => className.replace(/^focus:(.*)/, "$1"));
  //
  // const hover = classNames
  //   .filter(className => /^hover:/.test(className))
  //   .map(className => className.replace(/^hover:(.*)/, "$1"));
  //
  // console.log(identifiers.length, "/", classNames.length);
  // console.log("identifiers", identifiers);
  // console.log("responsive", responsive);
  // console.log("focus", focus);
  // console.log("hover", hover);

  const values: Record<string, string | number | true> = {};

  for (const className of classNames) {
    const negative = /^-/.test(className);
    const [, prefixes] = /^(.*):/.exec(className) || [];
    const [, name] = /^(?:.*:)?-?([^-]*)/.exec(className) || [];
    const valueMatch = /^-?[^-]+-(.*)/.exec(className);
    const value = valueMatch ? valueMatch[1] : className;

    console.log(className.padEnd(25), negative ? "-" : " ", (prefixes || "").padEnd(10), name.padEnd(10), value);

    //console.log("")
  }

  const types = `
export type CanBeArray<T> = T | T[];

// prettier-ignore
export interface StylewindProps {
${identifiers.map(className => `  ${className}?: CanBeArray<boolean>`)}
}
`;

  console.log("types", types);
});
