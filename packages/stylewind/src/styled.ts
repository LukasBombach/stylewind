import { createElement } from "react";
import useStyledProps from "./useStyledProps";
import { tags } from "./tags";

import type { FC, ComponentType, ForwardRefExoticComponent, ComponentProps } from "react";
import type { Props } from "stylewind-bridge";
import type { Tag } from "./tags";

export type Styleable = Tag | ComponentType<any> | ForwardRefExoticComponent<any>;
export type StyledComponent<T extends Styleable> = FC<ComponentProps<T> & Props>;

export type TagMethods = {
  [T in Tag]: (...props: Props[]) => StyledComponent<T>;
};

function createComponent<T extends Styleable>(el: T, ...props: Props[]): StyledComponent<T> {
  return componentProps => {
    const mergedProps = [...props, componentProps].reduce((merged, props) => Object.assign(merged, props), {});
    const styledProps = useStyledProps(mergedProps);
    return createElement(el, styledProps);
  };
}

function getTagMethods(): TagMethods {
  const tagMethods = {} as TagMethods;
  tags.forEach(tag => Object.assign(tagMethods, { [tag]: (...props: Props[]) => createComponent(tag, ...props) }));
  return tagMethods;
}

const styled = Object.assign(createComponent, getTagMethods());

export default styled;
