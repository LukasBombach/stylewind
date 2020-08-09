import { isTailwindProp } from "stylewind-bridge";
import getTailwindClasseNames from "./getTailwindClasseNames";

export type Props = Record<string, any>;
export type StyledProps<P> = P & { className?: string };

function useStyledProps<P extends Props>({ className, ...props }: P): StyledProps<P> {
  const newProps = {} as StyledProps<P>;
  const classNames = className ? [className] : [];

  for (const name in props) {
    if (isTailwindProp(name)) {
      classNames.push(getTailwindClasseNames(name, props[name]));
    } else {
      newProps[name as keyof P] = props[name];
    }
  }

  if (classNames.length) {
    newProps.className = classNames.join(" ");
  }

  return newProps;
}

export default useStyledProps;
