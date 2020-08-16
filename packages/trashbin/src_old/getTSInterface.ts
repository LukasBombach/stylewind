import type { Prop, Value } from "./parseCss";

export function getTSInterface(props: Prop[]): string {
  return `// prettier-ignore
export interface Props {
${props.map(getProp).join(`\n`)}
}

export type PropValue<T> = T[] | T`;
}

function getProp({ name, values }: Prop): string {
  return `  "${name}"?: PropValue<${getValues(values)}>;`;
}

function getValues(values: Value[]): string {
  const parsedValues = values.map(parseValue);
  const uniqueValues = [...new Set(parsedValues)];
  return uniqueValues.join(" | ");
}

function parseValue(value: Value): string {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return value.toString();
  if (typeof value === "string") return `"${value}"`;
  throw new Error(`unknow value type "${typeof value}" for "${value}"`);
}
