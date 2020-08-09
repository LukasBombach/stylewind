import { getTailWindClassNames } from "./getTailWindCss";

export default async function getIsTailwindProp(): Promise<string[]> {
  const classNames = await getTailWindClassNames();
  return classNames;
}
