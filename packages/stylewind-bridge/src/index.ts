import path from "path";
import { promises as fs } from "fs";
import getProps from "./getProps";

const dist = (p = "") => path.resolve(__dirname, "../dist", p);

async function getInterface() {
  const props = await getProps();

  const entries = Object.entries(props)
    .filter(([name]) => !/:/.test(name))
    .sort(([a], [b]) => (a > b ? 1 : -1));

  const tsData = entries.map(([name, values]) => {
    const valuesType = values.map(value => {
      if (value === "true") return "boolean";
      if (/^\d+$/.test(value.toString())) return parseFloat(value.toString());
      if (typeof value === "string") return `"${value}"`;
      throw new Error(`Unhandled value type ${typeof value} "${value}"`);
    });
    return [name, name.toUpperCase(), valuesType.join(" | ")];
  });

  const tsTypes = tsData.map(([, type, value]) => `export type ${type} = ${value};`);

  const tsProps = tsData.map(([name, type]) => `  ${name}?: ${type} | ${type}[];`);

  return `${tsTypes.join(`\n`)}

export interface StylewindProps {
${tsProps.join(`\n`)}
}`;
}

async function run() {
  const contents = await getInterface();

  await fs.rmdir(dist(), { recursive: true });
  await fs.mkdir(dist());
  await fs.writeFile(dist("index.ts"), contents);
}

run();
