import { createElement } from "react";

import type { FC } from "react";

// function styled(className: string): FC;
// function styled<P extends Record<string, unknown> = {}>(fn: (props: P) => string): FC<P>;
// function styled<P extends Record<string, unknown> = {}>(param: (fn: (props: P) => string) | string ): FC<P> {}

type Props = Record<string, unknown>;
type TagName = keyof JSX.IntrinsicElements;
type Styles = string | ((props: Props) => string);
type ClassNameProp = { className?: string };

function styled<P extends Props = {}, S = Styles>(
  tagName: TagName,
  styles: S
): FC<S extends string ? ClassNameProp : ClassNameProp & P> {
  return ({ children, ...props }) => {
    const tailwindClasses = typeof styles === "function" ? styles(props) : styles;
    const className = props.className ? `${props.className} ${tailwindClasses}` : tailwindClasses;
    return createElement(tagName, { ...props, className }, children);
  };
}

export default styled;
