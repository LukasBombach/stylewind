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

  test.each`
    desc                 | props                                                                     | expected
    ${"a className"}     | ${{ className: "foo bar" }}                                               | ${"foo bar"}
    ${"a string"}        | ${{ foo: "bar" }}                                                         | ${"foo-bar"}
    ${"a number"}        | ${{ foo: 2 }}                                                             | ${"foo-2"}
    ${"true"}            | ${{ foo: true }}                                                          | ${"foo"}
    ${"false"}           | ${{ foo: false }}                                                         | ${undefined}
    ${"multiple values"} | ${{ className: "foo bar", str: "str", num: 2, true: true, false: false }} | ${"foo bar str-str num-2 true"}
  `("generates classNames from $desc", ({ props, expected }) => {
    expect(useStyles(props)).toBe(expected);
  });

  test("there is no tailwind class useStyles cannot generate", () => {
    expect(classParams.length).toBe(generatedClasses.length);
  });
});
