function getTailwindClasseNames(name: string, value: string | string[]) {
  const values = Array.isArray(value) ? value : [value];
  return values.map(val => getTailwindClasseName(name, val)).join(" ");
}

// todo this code is not pretty, but I just wanna release
function getTailwindClasseName(name: string, value: string) {
  if (typeof value?.lastIndexOf !== "function") {
    return `${name}${value}`;
  }
  const lastColon = value.lastIndexOf(":");
  if (lastColon < 0) return `${name}:${value}`;
  const prefix = value.substring(0, lastColon);
  const value2 = value.substring(lastColon + 1);
  return `${prefix}:${name}:${value2}`;
}

export default getTailwindClasseNames;
