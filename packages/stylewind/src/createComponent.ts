import { createElement } from "react";
import deepmerge from "deepmerge";
import useStyledProps from "./useStyledProps";

import type { FC, ComponentType, ForwardRefExoticComponent, ComponentProps } from "react";
import type { Props } from "stylewind-bridge";
import type { Tag } from "./tags";

/*
 * Types
 */
export type Styleable = Tag | ComponentType<any> | ForwardRefExoticComponent<any>;
export type CreateComponent = <T extends Styleable>(el: T, ...props: Props[]) => StyledComponent<T>;
export type StyledComponent<T extends Styleable> = StyledComponentWithoutRef<T> & Ref;
export type StyledComponentWithoutRef<T extends Styleable> = FC<ComponentProps<T> & Props>;
export type Ref = { __useStyledProps: Props };

/**
 * Creates a styled component with the `__useStyledProps` property
 */
function createComponentWithRef<T extends Styleable>(el: T, ...props: Props[]): StyledComponent<T> {
  const component = createComponent(el, ...props);
  return Object.assign(component, { __useStyledProps: getProps(...props) });
}

/**
 * Creates a styled component
 */
function createComponent<T extends Styleable>(el: T, ...props: Props[]): StyledComponentWithoutRef<T> {
  return componentProps => {
    const styledProps = useStyledProps(getProps(...props, componentProps));
    return createElement(el, styledProps);
  };
}

/**
 * Merges a list of props with regard to the `__useStyledProps` property
 */
function getProps(...props: Props[]): Exclude<Props, "__useStyledProps"> {
  const unrefedProps = props.map(props => (props as any)?.__useStyledProps || props);
  return deepmerge.all<Exclude<Props, "__useStyledProps">>(unrefedProps);
}

export default createComponentWithRef as CreateComponent;
