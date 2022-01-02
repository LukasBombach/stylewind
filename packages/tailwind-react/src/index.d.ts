import type { FC } from "react";
declare type Props = Record<string, unknown>;
declare type TagName = keyof JSX.IntrinsicElements;
declare type Styles = string | ((props: Props) => string);
declare type ClassNameProp = {
    className?: string;
};
declare function styled<P extends Props = {}, S = Styles>(tagName: TagName, styles: S): FC<S extends string ? ClassNameProp : ClassNameProp & P>;
export default styled;
