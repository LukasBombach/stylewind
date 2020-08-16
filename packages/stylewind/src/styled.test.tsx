import React from "react";
import { render } from "@testing-library/react";
import styled from "./styled";
import { tags } from "./tags";

describe.each(tags)("styled", tag => {
  test(`styled("${tag}") renders <${tag} />`, () => {
    const Component = styled(tag);
    const { container } = render(<Component />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`<${tag} />`);
  });

  test(`styled.${tag}() renders <${tag} />`, () => {
    const Component = styled[tag]();
    const { container } = render(<Component />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`<${tag} />`);
  });

  test('text: "2xl" renders the className text:2xl', () => {
    const Component = styled[tag]({ text: "2xl" });
    const { container } = render(<Component />);
    expect(container.firstElementChild?.className).toBe("text:2xl");
  });
});
