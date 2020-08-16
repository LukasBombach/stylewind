import React from "react";
import { render } from "@testing-library/react";
import styled from "./styled";
import { tags } from "./tags";

describe("styled", () => {
  test.each(tags.map(t => [t, t]))('styled("%s") renders <%s />', tag => {
    const Component = styled(tag);
    const { container } = render(<Component />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`<${tag} />`);
  });

  test.each(tags.map(t => [t, t]))("styled.%s() renders <%s />", tag => {
    const Component = styled[tag]();
    const { container } = render(<Component />);
    expect(container.firstElementChild).toMatchInlineSnapshot(`<${tag} />`);
  });
});
