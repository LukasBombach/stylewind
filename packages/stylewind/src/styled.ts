import { createElement } from "react";
import useStyledProps from "./useStyledProps";
import { tags } from "./tags";

import type { FC, ComponentProps } from "react";
import type { Props } from "stylewind-bridge";
import type { Tag } from "./tags";

export type StyledComponent<T extends Tag> = FC<ComponentProps<T> & Props>;

export type TagMethods = {
  [T in Tag]: (props: Props) => StyledComponent<T>;
};

function createComponent<T extends Tag>(el: T, props: Props): StyledComponent<T> {
  return componentProps => {
    const mergedProps = Object.assign({}, props, componentProps);
    const styledProps = useStyledProps(mergedProps);
    return createElement(el, styledProps);
  };
}

function getTagMethods(): TagMethods {
  const tagMethods = {} as TagMethods;
  tags.forEach(tag => Object.assign(tagMethods, { [tag]: (props: Props) => createComponent(tag, props) }));
  return tagMethods;
}

const styled = Object.assign(createComponent, getTagMethods());

export default styled;
