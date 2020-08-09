function getTailwindClasseNames(name: string, value: string | string[]) {
  const values = Array.isArray(value) ? value : [value];
  return values.map(val => `${name}:${val}`).join(" ");
}

export default getTailwindClasseNames;
