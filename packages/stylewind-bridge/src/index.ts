import { getTailWindClassNames } from "./getTailWindCss";
import splitClassName from "./splitClassName";

getTailWindClassNames().then(classNames => {
  const values: Record<string, (string | number | true)[]> = {};

  for (const className of classNames) {
    const { name, value, prefix } = splitClassName(className);
    values[name] = values[name] || [];
    values[name].push(`${prefix}${value}`);
    values[name].sort();
  }

  console.log(values);
});
