import useStyles from "./useStyles";
import generatedClasses from "./generated/classes";
import props from "./generated/props";

import type { Value } from "./parseCss";
import type { TailwindClasses } from "./generated/classes";

type Paramter = [typeof props[number]["name"], Value];

type TailwindClass = TailwindClasses[number];

function getAllPropParamters() {
  const params: Paramter[] = [];
  for (const { name, values } of props) {
    for (const value of values) {
      params.push([name, value]);
    }
  }
  return params;
}

describe("useStyles", () => {
  const propParameters = getAllPropParamters();

  test.each(propParameters)(
    "tailwind contains the generated class for { %s: %s }",
    (name, value) => {
      const props = { [name]: value };
      const className = useStyles(props);
      if (value === false) {
        expect(className).toBe(undefined);
      } else {
        expect(className).not.toBe(undefined);
        expect(generatedClasses.includes(className as TailwindClass)).toBe(
          true
        );
      }
    }
  );

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
    const generatableClasses = propParameters.filter(
      ([, value]) => value !== false
    );

    expect(generatableClasses.length).toBe(generatedClasses.length);
  });
});
