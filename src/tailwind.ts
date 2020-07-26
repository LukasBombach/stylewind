import { promises as fs } from "fs";
import path from "path";
import { getProps, getClassNames } from "./parseCss";
import { getTSInterface } from "./getTSInterface";
import type { Prop } from "./parseCss";

export const tailwindCSSPath = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "tailwindcss/dist/tailwind.css"
);

const generatedTSPath = path.resolve(__dirname, "generated/props.ts");
const generatedPropsPath = path.resolve(__dirname, "generated/props.json");
const generatedClassesPath = path.resolve(__dirname, "generated/classes.json");

export async function getTailWindCss(): Promise<string> {
  return await fs.readFile(tailwindCSSPath, "utf-8");
}

export async function getTailwindProps(): Promise<Prop[]> {
  const css = await getTailWindCss();
  return await getProps(css);
}

export async function getTailwindClasses(): Promise<string[]> {
  const css = await getTailWindCss();
  return await getClassNames(css);
}

export async function generatePropsJSON(): Promise<void> {
  const props = await getTailwindProps();
  await fs.writeFile(generatedPropsPath, JSON.stringify(props, null, 2));
}

export async function generateClassesJSON(): Promise<void> {
  const classes = await getTailwindClasses();
  await fs.writeFile(generatedClassesPath, JSON.stringify(classes, null, 2));
}

export async function generateTypeScriptInterface(): Promise<void> {
  const props = await getTailwindProps();
  const tsInterface = getTSInterface(props);
  await fs.writeFile(generatedTSPath, tsInterface);
}
