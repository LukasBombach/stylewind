import React from "react";
import { render } from "@testing-library/react";
import styled from "./styled";
import tags from "./tags";

describe("styled", () => {
  test.each(tags)("creates a %s component", (tag) => {
    const Component = styled(tag);
    const { container } = render(<Component />);
    expect(container.querySelector(tag)).not.toBe(null);
  });
});
