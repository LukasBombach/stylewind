import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

export interface Prop {
  name: string;
  values: Value[];
}

export type Value = string | number | boolean;

export async function getClassNames(css: string): Promise<string[]> {
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

export async function getProps(css: string): Promise<Prop[]> {
  const classNames = await getClassNames(css);
  const parsedClassNames = classNames.map(parseClassName);
  const props = mergeParsedClassNames(parsedClassNames);
  return props.sort(({ name: a }, { name: b }) => (a < b ? -1 : a > b ? 1 : 0));
}

function parseClassName(className: string): Prop {
  const [, name, rawValue] = className.match(/(^-?[^-]+)-?(.*)/) || [];
  if (!name) throw new Error(`failed to get prop for ${className}`);
  const values = parseValue(rawValue);
  return { name, values };
}

function mergeParsedClassNames(props: Prop[]): Prop[] {
  const newProps: Prop[] = [];
  for (const prop of props) {
    const existingProp = newProps.find(({ name }) => name === prop.name);
    if (existingProp) existingProp.values.push(...prop.values);
    else newProps.push(prop);
  }
  for (const prop of newProps) {
    prop.values = [...new Set(prop.values)];
  }
  return newProps;
}

function parseValue(value: string) {
  if (value === "") return [true, false];
  if (/^\d+$/.test(value)) return [parseInt(value)];
  return [value];
}
