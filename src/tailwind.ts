import { promises as fs } from "fs";
import path from "path";
import { getProps } from "./parseCss";
import { getTSInterface } from "./getTSInterface";

export const tailwindCSSPath = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "tailwindcss/dist/tailwind.css"
);

const generatedTSPath = path.resolve(__dirname, "generated/props.ts");

export async function getTailWindCss(): Promise<string> {
  return await fs.readFile(tailwindCSSPath, "utf-8");
}

export async function generateTypeScriptInterface(): Promise<void> {
  const css = await getTailWindCss();
  const props = await getProps(css);
  const tsInterface = getTSInterface(props);
  await fs.writeFile(generatedTSPath, tsInterface);
}
