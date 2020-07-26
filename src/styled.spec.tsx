import React from "react";
import { render } from "@testing-library/react";
import * as useStyles from "./useStyles";
import styled from "./styled";
import tags from "./tags";
import type { Props } from "./generated/props.types";

const link = `<a
  href="#"
/>`;

describe("styled", () => {
  function isAcceptable(msg: string) {
    const acceptableWarnings = /(validateDOMNesting|unrecognized in this browser)/;
    if (!msg.match(acceptableWarnings)) throw new Error("Unexpected warning");
  }

  test.each(tags)('styled("%s") creates the expected element', (tag) => {
    jest.spyOn(console, "error").mockImplementationOnce(isAcceptable);
    const Component = styled(tag);
    const { container } = render(<Component />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`<${tag} />`);
  });

  test.each(tags)("styled.%s()) creates the expected element", (tag) => {
    jest.spyOn(console, "error").mockImplementationOnce(isAcceptable);
    const Component = styled[tag]();
    const { container } = render(<Component />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`<${tag} />`);
  });

  test('styled("div", props) apply the classes from useStyles', () => {
    const expectedClass = "expectedClass";
    const spy = jest.spyOn(useStyles, "default").mockReturnValue(expectedClass);
    const props: Props = { font: "sans" };
    const Component = styled("div", props);
    const { container } = render(<Component />);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(props));
    expect(container.querySelector(`.${expectedClass}`)).toBeTruthy();
    spy.mockRestore();
  });

  test("styled.div(props) apply the classes from useStyles", () => {
    const expectedClass = "expectedClass";
    const spy = jest.spyOn(useStyles, "default").mockReturnValue(expectedClass);
    const props: Props = { font: "sans" };
    const Component = styled.div(props);
    const { container } = render(<Component />);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(props));
    expect(container.querySelector(`.${expectedClass}`)).toBeTruthy();
    spy.mockRestore();
  });

  test("<Styled {...props}> apply the classes from useStyles", () => {
    const expectedClass = "expectedClass";
    const spy = jest.spyOn(useStyles, "default").mockReturnValue(expectedClass);
    const props: Props = { font: "sans" };
    const Component = styled("div");
    const { container } = render(<Component {...props} />);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(props));
    expect(container.querySelector(`.${expectedClass}`)).toBeTruthy();
    spy.mockRestore();
  });

  test('styled("a") returns a TypeScript Anchor type', () => {
    const Link = styled("a");
    const { container } = render(<Link href="#" />);
    expect(container.firstElementChild).toMatchInlineSnapshot(link);
  });

  test("styled.a() returns a TypeScript Anchor type", () => {
    const Link = styled.a();
    const { container } = render(<Link href="#" />);
    expect(container.firstElementChild).toMatchInlineSnapshot(link);
  });
});
