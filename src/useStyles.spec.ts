import useStyles from "./useStyles";

describe("useStyles", () => {
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
});
