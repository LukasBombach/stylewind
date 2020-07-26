import { promises as fs } from "fs";
import path from "path";
import { getProps, getClassNames } from "./parseCss";
import { getTSInterface } from "./getTSInterface";
import tailwindClassesRegex from "./tailwindClassesRegex";

import type { Prop } from "./parseCss";

export const tailwindCSSPath = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "tailwindcss/dist/tailwind.css"
);

const generatedTSPath = path.resolve(__dirname, "generated/props.types.ts");
const generatedPropsPath = path.resolve(__dirname, "generated/props.ts");
const generatedClassesPath = path.resolve(__dirname, "generated/classes.ts");
const generatedRegExPath = path.resolve(
  __dirname,
  "generated/isTailwindClass.ts"
);
const generatedIsTailwindPropPath = path.resolve(
  __dirname,
  "generated/isTailwindProp.ts"
);

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
  const fileContents = serializeJsonAsConst("TailwindProps", props);
  await fs.writeFile(generatedPropsPath, fileContents);
}

export async function generateClassesJSON(): Promise<void> {
  const classes = await getTailwindClasses();
  const fileContents = serializeJsonAsConst("TailwindClasses", classes);
  await fs.writeFile(generatedClassesPath, fileContents);
}

export async function generateTypeScriptInterface(): Promise<void> {
  const props = await getTailwindProps();
  const tsInterface = getTSInterface(props);
  await fs.writeFile(generatedTSPath, tsInterface);
}

export async function generateTailwindRegex(): Promise<void> {
  const fileContents = `import type { TailwindClasses } from "./classes";
export default (str: string): str is TailwindClasses[number]  => /${tailwindClassesRegex}/.test(str);`;
  await fs.writeFile(generatedRegExPath, fileContents);
}

export async function generateIsTailwindProp(): Promise<void> {
  const props = await getTailwindProps();
  const propNames = JSON.stringify(Object.keys(props), null, 2);
  const fileContents = `const propNames = ${propNames} as const;
export default (str: string) => propNames.includes(str);`;
  await fs.writeFile(generatedIsTailwindPropPath, fileContents);
}

function serializeJsonAsConst(name: string, data: any): string {
  return `
const data = ${JSON.stringify(data, null, 2)} as const;
export type ${name} = typeof data;
export default data;
`;
}
