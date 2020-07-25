import { promises as fs } from "fs";
import path from "path";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const tailwindCSSPath = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "tailwindcss/dist/tailwind.css"
);

const generatedTypesPath = path.resolve(
  __dirname,
  "..",
  "src/generated/props.ts"
);

async function getSelectors() {
  const css = await fs.readFile(tailwindCSSPath, "utf-8");
  const selectors: string[] = [];
  const classNames: string[] = [];
  postcss.parse(css).walkRules((rule) => {
    selectors.push(rule.selector);

    selectorParser((selectors) => {
      selectors.walkClasses(({ value }) => {
        if (value) classNames.push(value);
      });
    }).processSync(rule);
  });

  return { selectors, classNames };
}

async function getProps() {
  const { classNames } = await getSelectors();
  const props: Record<string, string[]> = {};

  for (const className of classNames) {
    const [, prop, value] = className.match(/(^-?[^-]+)-?(.*)/) || [];
    if (!prop) throw new Error(`failed to get prop for ${className}`);
    if (!props[prop]) props[prop] = [];
    if (!props[prop].includes(value)) props[prop].push(value);
  }

  return props;
}

async function getTypes() {
  const props = await getProps();
  return `// prettier-ignore
export interface Props {
${Object.entries(props)
  .sort(([a], [b]) => {
    return a < b ? -1 : a > b ? 1 : 0;
  })
  .map(([key, values]) => {
    const cleanedValues = values
      .map((value) => {
        if (value === "") return "boolean";
        if (/^\d+$/.test(value)) return parseInt(value);
        return `"${value}"`;
      })
      .join(" | ");
    return [key, cleanedValues];
  })
  .map(([key, values]) => {
    return `  "${key}"?: ${values};`;
  })
  .join(`\n`)}
}`;
}

async function generateTypes() {
  const types = await getTypes();
  await fs.writeFile(generatedTypesPath, types);
}

generateTypes();
