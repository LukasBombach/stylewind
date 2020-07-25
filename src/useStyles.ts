function useStyles<
  P extends Record<string, string | number | boolean | undefined>
>(props: P): { className: string } {
  const classNames: string[] = [];

  for (const name in props) {
    const value = props[name];

    if (name === "className" && typeof value === "string") {
      classNames.push(value);
    } else if (value === true) {
      classNames.push(name);
    } else {
      classNames.push(`${name}-${value}`);
    }
  }

  return { className: classNames.join(" ") };
}

export default useStyles;
