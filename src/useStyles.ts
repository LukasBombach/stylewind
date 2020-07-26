import isTailwindProp from "./generated/isTailwindProp";

import type { Value } from "./parseCss";

type StyledProps<P> = P & { className: string };

function useStyles<P extends {}>(props: P): StyledProps<P> {
  const classNames: string[] = [];
  const newProps = {} as StyledProps<P>;

  for (const name in props) {
    const value = props[name];

    if (name === "className" && typeof value === "string") {
      classNames.push(value);
    } else if (typeof value === "boolean") {
      if (value) classNames.push(name);
    } else if (isTailwindProp(name)) {
      const values = (Array.isArray(value) ? value : [value]) as Value[];
      classNames.push(name, ...values.map((v) => `${name}-${v}`));
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

/*   const entries = Object.entries(props)

  for (const [name, propValue] of entries) {


    const values = Array.isArray(propValue) ? propValue : [propValue]

    for (const value of values) {
      if (name === "className" && typeof value === "string") {
        classNames.push(value);
      }else if (typeof value === "boolean") {
        if (value) classNames.push(name);
      } else if (isTailwindClass(value) ){
        classNames.push(value);
      }

    }

    
  } */
