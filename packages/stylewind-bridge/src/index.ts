// import util from "util";
import path from "path";
import { promises as fs } from "fs";
import getProps from "./getProps";

const dist = (p = "") => path.resolve(__dirname, "../dist", p);

// function inspect(value: any) {
//   console.log(util.inspect(value, { depth: null, colors: true, maxArrayLength: Infinity, compact: false }));
// }

async function getInterface() {
  const props = await getProps();
  const entries = Object.entries(props).sort(([a], [b]) => (a > b ? 1 : -1));
  const types = entries.map(([name, values]) => {
    const valuesType = values.map(v => JSON.stringify(v));
    return [name.toUpperCase(), valuesType.join(" | ")];
  });
  return types
    .map(([name, value]) => {
      return `type ${name} = ${value};`;
    })
    .join(`\n`);
}

async function run() {
  const contents = await getInterface();

  await fs.rmdir(dist(), { recursive: true });
  await fs.mkdir(dist());
  await fs.writeFile(dist("props.ts"), contents);
}

run();

// getProps().then(props => {
//   const name = "text";
//   const values = props[name].filter(v => !/:/.test(v.toString()));
//   inspect(values);
// });
