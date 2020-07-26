import { createElement } from "react";
import useStyles from "./useStyles";
import tags from "./tags";

import type { FC } from "react";
import type { Tag } from "./tags";
import type { Props } from "./generated/props.types";

type Styled = typeof styled &
  {
    [T in Tag]: (props?: Props) => FC<Props>;
  };

function styled<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  props: Props = {}
): FC<Props & JSX.IntrinsicElements[T]> {
  return ({ children, ...componentProps }) => {
    const styledProps = useStyles({ ...props, ...componentProps });
    return createElement(tag, styledProps, children);
  };
}

for (const tag of tags) {
  Object.defineProperty(styled, tag, {
    get: () => (props?: Props) =>
      styled(tag as keyof JSX.IntrinsicElements, props),
  });
}

export default styled as Styled;
