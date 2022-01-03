import { createElement } from "react";

import type { FC } from "react";

type Props = Record<string, unknown>;
type TagName = keyof JSX.IntrinsicElements;
type Styles = string | ((props: Props) => string);
type ClassNameProp = { className?: string };
type SFC<P extends Props = {}, S extends Styles = string> = FC<S extends string ? ClassNameProp : ClassNameProp & P>;

function styled<P extends Props = {}, S extends Styles = string>(tagName: TagName, styles: S): SFC<P, S> {
  const StyledComponent: SFC<P, S> = ({ children, ...props }) => {
    const tailwindClasses = typeof styles === "function" ? styles(props) : styles;
    const className = props.className ? `${props.className} ${tailwindClasses}` : tailwindClasses;
    return createElement(tagName, { ...props, className }, children);
  };

  StyledComponent.displayName = tagName;

  return StyledComponent;
}

export default styled;
