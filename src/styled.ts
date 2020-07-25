import { createElement } from "react";
import useStyles from "./useStyles";
import type { FC } from "react";
import type { Tag } from "./tags";
import type { Props } from "./generated/props";

function styled(tag: Tag, props: Props): FC {
  return ({ children, ...componentProps }) => {
    const compoundProps = useStyles({ ...props, ...componentProps });
    return createElement(tag, compoundProps, children);
  };
}

export default styled;
