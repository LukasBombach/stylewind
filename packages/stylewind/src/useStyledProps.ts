import getTailwindClasseNames from "./getTailwindClasseNames";

export type Props = Record<string, any>;

function useStyledProps<P extends Props>({ className, ...props }: P): string | undefined {
  const classNames = className ? [className] : [];

  for (const name in props) {
    classNames.push(getTailwindClasseNames(name, props[name]));
  }

  return classNames.length ? classNames.join(" ") : undefined;
}

export default useStyledProps;
