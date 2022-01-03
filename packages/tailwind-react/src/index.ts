import { createElement } from "react";

import type { FC } from "react";

type Props = Record<string, unknown>;
type TagName = keyof JSX.IntrinsicElements;
type NativeProps<T extends TagName> = JSX.IntrinsicElements[T] & { className?: string };

type Styles = string | ((props: Props) => string);
type SFC<T extends TagName, P extends Props = {}, S extends Styles = string> = FC<
  S extends string ? NativeProps<T> : NativeProps<T> & P
>;

function styled<T extends TagName, P extends Props = {}, S extends Styles = string>(
  tagName: T,
  styles: S
): SFC<T, P, S> {
  const StyledComponent: SFC<T, P, S> = ({ children, ...props }) => {
    const tailwindClasses = typeof styles === "string" ? styles : styles(props);
    const className = props.className ? `${props.className} ${tailwindClasses}` : tailwindClasses;
    return createElement(tagName, { ...props, className }, children);
  };

  StyledComponent.displayName = tagName;

  return StyledComponent;
}

export default styled;
