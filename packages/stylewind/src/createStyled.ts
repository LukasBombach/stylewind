import createComponent from "./createComponent";
import { tags } from "./tags";

import type { Props } from "stylewind-bridge";
import type { CreateComponent, StyledComponent } from "./createComponent";
import type { Tag } from "./tags";

export type Styled = CreateComponent & TagMethods;
export type TagMethods = {
  [T in Tag]: (...props: Props[]) => StyledComponent<T>;
};

/**
 * Returns the tag methods (.div() etc) for the styled function
 */
function getTagMethods(): TagMethods {
  const tagMethods = {} as TagMethods;
  tags.forEach(tag => Object.assign(tagMethods, { [tag]: (...props: Props[]) => createComponent(tag, ...props) }));
  return tagMethods;
}

/**
 * The `styled` function with static methods
 */
const styled: Styled = Object.assign(createComponent, getTagMethods());

export default styled;
