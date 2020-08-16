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

  test('text: "blue-100" renders the expected className', () => {
    const Component = styled[tag]({ text: "blue-100" });
    const { container } = render(<Component />);
    expect(container.firstElementChild?.className).toBe("text-blue-100");
  });

  test('text: ["blue-100", "yellow-100"] renders the expected className', () => {
    const Component = styled[tag]({ text: ["blue-100", "yellow-100"] });
    const { container } = render(<Component />);
    expect(container.firstElementChild?.className).toBe("text-blue-100 text-yellow-100");
  });

  test('text: ["blue-100", "hover:yellow-100", "xl:hover:red-100"] renders the expected className', () => {
    const Component = styled[tag]({ text: ["blue-100", "hover:yellow-100", "xl:hover:red-100"] });
    const { container } = render(<Component />);
    expect(container.firstElementChild?.className).toBe("text-blue-100 hover:text-yellow-100 xl:hover:text-red-100");
  });
});
