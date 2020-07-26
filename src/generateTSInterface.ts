import type { Prop } from "./parseCss";

export function generateTSInterface(props: Prop[]): string {
  return `// prettier-ignore
export interface Props {
${props.map(getProp).join(`\n`)}
}`;
}

function getProp({ name, values }: Prop): string {
  return `  "${name}"?: ${values.join(" | ")};`;
}
