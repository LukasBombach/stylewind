import useStyles from "./useStyles";
import generatedClasses from "./generated/classes";
import props from "./generated/props";

import type { Value } from "./parseCss";
import type { TailwindClasses } from "./generated/classes";

type Paramter = [typeof props[number]["name"], Value];
type TailwindClass = TailwindClasses[number];

function getAllPropParamters() {
  return props.flatMap(({ name, values }) =>
    (values as Readonly<Value[]>).map((value) => [name, value] as Paramter)
  );
}

describe("useStyles", () => {
  const allParams = getAllPropParamters();
  const classParams = allParams.filter(([, value]) => value !== false);
  const undefParams = allParams.filter(([, value]) => value === false);

  test.each(classParams)(
    "tailwind contains the generated class for { %s: %s }",
    (name, value) => {
      const props = { [name]: value };
      const className = useStyles(props);
      expect(className).not.toBe(undefined);
      expect(generatedClasses.includes(className as TailwindClass)).toBe(true);
    }
  );

  test.each(undefParams)("retuns undefined for { %s: %s }", (name, value) => {
    const props = { [name]: value };
    const className = useStyles(props);
    expect(className).toBe(undefined);
  });

  test("preserves the original className", () => {
    const className = "foo bar";
    expect(useStyles({ className })).toBe(className);
  });

  test("returns props set to `true` as className", () => {
    const container = true;
    const capitalize = true;
    const clearfix = false;
    const props = { container, capitalize, clearfix };
    const expectedClassName = "container capitalize";
    expect(useStyles(props)).toBe(expectedClassName);
  });

  test("generates classNames from props with values", () => {
    const props = { bottom: 0, box: "border" };
    const expectedClassName = "bottom-0 box-border";
    expect(useStyles(props)).toBe(expectedClassName);
  });

  test("returns empty styles as undefined", () => {
    expect(useStyles({})).toBe(undefined);
  });

  test("there is no tailwind class useStyles cannot generate", () => {
    expect(classParams.length).toBe(generatedClasses.length);
  });
});
