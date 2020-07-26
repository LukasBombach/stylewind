import isTailwindClass from "./generated/isTailwindClass";

type StyledProps<P> = P & { className: string };

function useStyles<P extends {}>(props: P): StyledProps<P> {
  const classNames: string[] = [];
  const newProps = {} as StyledProps<P>;

  for (const name in props) {
    const value = props[name];
    const className = `${name}-${value}`;

    if (name === "className" && typeof value === "string") {
      classNames.push(value);
    } else if (typeof value === "boolean") {
      if (value) classNames.push(name);
    } else if (isTailwindClass(className)) {
      classNames.push(className);
    } else {
      Object.assign(newProps, { [name]: value });
    }
  }

  if (classNames.length) {
    newProps.className = classNames.join(" ");
  }

  return newProps;
}

export default useStyles;
