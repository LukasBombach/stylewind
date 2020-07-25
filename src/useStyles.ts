function useStyles<
  P extends Record<string, string | number | boolean | undefined>
>(props: P): string | undefined {
  const classNames: string[] = [];

  for (const name in props) {
    const value = props[name];

    if (name === "className" && typeof value === "string") {
      classNames.push(value);
    } else if (typeof value === "boolean") {
      if (value) classNames.push(name);
    } else {
      classNames.push(`${name}-${value}`);
    }
  }

  return classNames.length ? classNames.join(" ") : undefined;
}

export default useStyles;
