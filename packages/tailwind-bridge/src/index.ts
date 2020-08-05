import { promises as fs } from "fs";
import { resolve } from "path";

const nodeModule = (path: string) => resolve(__dirname, "..", "node_modules", path);
const dist = (path: string) => resolve(__dirname, "..", "dist", path);

const tailwindCSSPath = nodeModule("tailwindcss/dist/tailwind.css");

async function getTailWindCss(): Promise<string> {
  return await fs.readFile(tailwindCSSPath, "utf-8");
}

async function generateProps() {}

async function generateIsTailwindProp() {}

async function generateGetTailwindClasses() {}

function isTailwindProp(name: string, value: any) {}
