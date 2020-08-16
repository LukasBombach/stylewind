import { createElement } from "react";
import useStyledProps from "./useStyledProps";
import { tags } from "./tags";

import type { FC, ComponentProps } from "react";
import type { StylewindProps } from "stylewind-bridge";
import type { Tag } from "./tags";

export type StyledComponent<T extends Tag> = FC<ComponentProps<T> & StylewindProps>;

export type TagMethods = {
  [T in Tag]: (props?: StylewindProps) => StyledComponent<T>;
};

function createComponent<T extends Tag>(el: T, props: StylewindProps = {}): StyledComponent<T> {
  return componentProps => {
    const mergedProps = Object.assign({}, props, componentProps);
    const className = useStyledProps(mergedProps);
    return createElement(el, { className });
  };
}

function getTagMethods(): TagMethods {
  const tagMethods = {} as TagMethods;
  tags.forEach(tag => Object.assign(tagMethods, { [tag]: (props?: StylewindProps) => createComponent(tag, props) }));
  return tagMethods;
}

const styled = Object.assign(createComponent, getTagMethods());

export default styled;
