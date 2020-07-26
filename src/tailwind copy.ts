import { promises as fs } from "fs";
import path from "path";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

export const tailwindCSSPath = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "tailwindcss/dist/tailwind.css"
);

export async function getTailWindCss(): Promise<string> {
  return await fs.readFile(tailwindCSSPath, "utf-8");
}

async function getClassNames(css: string): Promise<string[]> {
  const classNames: string[] = [];
  postcss.parse(css).walkRules((rule) => {
    selectorParser((selectors) => {
      selectors.walkClasses(({ value }) => {
        if (value) classNames.push(value);
      });
    }).processSync(rule);
  });
  return classNames;
}

async function getProps(classNames: string[]) {
  const props: Record<string, string[]> = {};
  for (const className of classNames) {
    const [, prop, value] = className.match(/(^-?[^-]+)-?(.*)/) || [];
    if (!prop) throw new Error(`failed to get prop for ${className}`);
    if (!props[prop]) props[prop] = [];
    if (!props[prop].includes(value)) props[prop].push(value);
  }
  return props;
}

function cleanValues(values: string[]) {
  return values.map((value) => {
    if (value === "") return "boolean";
    if (/^\d+$/.test(value)) return parseInt(value);
    return `"${value}"`;
  });
}

function getTypeScriptProps(props: Record<string, string[]>) {
  const entires = Object.entries(props);
  const sorted = entires.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const cleaned = sorted.map(([k, v]) => [k, cleanValues(v).join(" | ")]);
  const lines = cleaned.map(([k, v]) => `  "${k}"?: ${v};`);
  return lines.join(`\n`);
}

async function getTypeScriptInterface(
  props: Record<string, string[]>
): Promise<string> {
  return `// prettier-ignore
export interface Props {
${getTypeScriptProps(props)}
}`;
}
