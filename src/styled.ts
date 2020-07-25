import { createElement } from "react";
import useStyles from "./useStyles";
import tags from "./tags";
import type { FC } from "react";
import type { Tag } from "./tags";
import type { Props } from "./generated/props";

type Styled = typeof styled &
  {
    [T in Tag]: (props?: Props) => FC<Props>;
  };

function styled(tag: Tag, props: Props = {}): FC<Props> {
  return ({ children, ...componentProps }) => {
    const compoundProps = useStyles({ ...props, ...componentProps });
    return createElement(tag, compoundProps, children);
  };
}

for (const tag of tags) {
  Object.defineProperty(styled, tag, {
    get: () => (props?: Props) => styled(tag, props),
  });
}

export default styled as Styled;
