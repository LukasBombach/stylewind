import { promises as fs } from "fs";
import { resolve } from "path";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const nodeModule = (path: string) => resolve(__dirname, "../../..", "node_modules", path);

const tailwindCSSPath = nodeModule("tailwindcss/dist/tailwind.css");

export async function getTailWindCss(): Promise<string> {
  return await fs.readFile(tailwindCSSPath, "utf-8");
}

export async function getTailWindClassNames(): Promise<string[]> {
  const css = await getTailWindCss();
  const classNames = new Set<string>();

  postcss.parse(css).walkRules(rule => {
    selectorParser(selectors => {
      selectors.walkClasses(({ value }) => {
        if (value) classNames.add(value);
      });
    }).processSync(rule);
  });

  const sortedClassNames = [...classNames].sort();
  return sortedClassNames;
}
