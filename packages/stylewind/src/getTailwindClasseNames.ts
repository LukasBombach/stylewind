function getTailwindClasseNames(name: string, value: unknown | unknown[]) {
  const values = Array.isArray(value) ? value : [value];
  return values.map(val => getTailwindClasseName(name, val)).join(" ");
}

// todo this code is not pretty, but I just wanna release
function getTailwindClasseName(name: string, value: unknown) {
  const valueAsStr = `${value}`;
  const lastColon = valueAsStr.lastIndexOf(":");
  if (lastColon < 0) return `${name}-${value}`;
  const prefix = valueAsStr.substring(0, lastColon);
  const value2 = valueAsStr.substring(lastColon + 1);
  return `${prefix}:${name}-${value2}`;
}

export default getTailwindClasseNames;
