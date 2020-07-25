import React from "react";
import { render } from "@testing-library/react";
import styled from "./styled";
import tags from "./tags";

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
});
