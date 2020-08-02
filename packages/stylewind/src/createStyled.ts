import createComponent from "./createComponent";
import { tags } from "./tags";

import type { Props } from "stylewind-bridge";
import type { CreateComponent, StyledComponent } from "./createComponent";
import type { Tag } from "./tags";

export type Styled = CreateComponent & TagMethods;
export type TagMethods = {
  [T in Tag]: (...props: Props[]) => ReturnType<> StyledComponent<T>; // ReturnType<typeof createComponent>;
};

function getTagMethods(): TagMethods {
  const tagMethods = {} as TagMethods;
  tags.forEach(tag => {
    tagMethods[tag] = (...props: Props[]) => createComponent(tag, ...props);
  });
  return tagMethods;
}

const styled: Styled = Object.assign(createComponent, getTagMethods());

export default styled;

const Div = styled.div();
