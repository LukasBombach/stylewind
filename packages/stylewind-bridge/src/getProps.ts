import { getTailWindClassNames } from "./getTailWindCss";
import splitClassName from "./splitClassName";

async function getProps() {
  const classNames = await getTailWindClassNames();
  const values: Record<string, (string | number | true)[]> = {};

  for (const className of classNames) {
    const { name, value, prefix } = splitClassName(className);
    values[name] = values[name] || [];
    if (!values[name].includes(`${prefix}${value}`)) values[name].push(`${prefix}${value}`);
    values[name].sort();
  }

  return values;
}

export default getProps;
