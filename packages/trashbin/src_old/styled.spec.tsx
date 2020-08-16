import React from "react";
import { render } from "@testing-library/react";
import * as useStyles from "./useStyles";
import styled from "./styled";
import tags from "./tags";

import type { Props } from "./generated/props.types";

describe("styled", () => {
  function isAcceptable(msg: string, ...rest: any[]) {
    const acceptableWarnings = /(validateDOMNesting|unrecognized in this browser)/;
    if (msg.match(acceptableWarnings)) return;
    console.error(msg, ...rest);
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
    const className = "className";
    const spy = jest.spyOn(useStyles, "default").mockReturnValue({ className });
    const props: Props = { font: "sans" };
    const Component = styled("div", props);
    const { container } = render(<Component />);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(props));
    expect(container.querySelector(`.${className}`)).toBeTruthy();
    spy.mockRestore();
  });

  test("styled.div(props) apply the classes from useStyles", () => {
    const className = "className";
    const spy = jest.spyOn(useStyles, "default").mockReturnValue({ className });
    const props: Props = { font: "sans" };
    const Component = styled.div(props);
    const { container } = render(<Component />);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(props));
    expect(container.querySelector(`.${className}`)).toBeTruthy();
    spy.mockRestore();
  });

  test("<Styled {...props}> apply the classes from useStyles", () => {
    const className = "className";
    const spy = jest.spyOn(useStyles, "default").mockReturnValue({ className });
    const props: Props = { font: "sans" };
    const Component = styled("div");
    const { container } = render(<Component {...props} />);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(props));
    expect(container.querySelector(`.${className}`)).toBeTruthy();
    spy.mockRestore();
  });

  test('styled("a") accepts link props', () => {
    const Link = styled("a", { font: "sans" });
    const { container } = render(<Link href="#" bg="black" />);
    const el = container.firstElementChild;
    expect(el.getAttribute("class")).toBe("font-sans bg-black");
    expect(el.getAttribute("href")).toBe("#");
  });

  test("styled.a() accepts link props", () => {
    const Link = styled.a({ font: "sans" });
    const { container } = render(<Link href="#" bg="black" />);
    const el = container.firstElementChild;
    expect(el.getAttribute("class")).toBe("font-sans bg-black");
    expect(el.getAttribute("href")).toBe("#");
  });
});
