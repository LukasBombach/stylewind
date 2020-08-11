type Breakpoint = "sm" | "md" | "lg" | "xl";

interface SplitClassName {
  name: string;
  value: string | number | true;
  prefix: string;
  breakpoint?: Breakpoint;
  focus: boolean;
  hover: boolean;
}

function splitClassName(className: string): SplitClassName {
  const [, name] = /(?:^.*:)?([^-]+).*$/.exec(className) || [];
  const [, valueStr] = /^-?.*?-(.*)$/.exec(className) || [];
  const [, breakpoint] = (/(sm|md|lg|xl)/.exec(className) || []) as Breakpoint[];
  const [, prefix] = /^-?(.*:)/.exec(className) || ["", ""];
  const sign = /^-/.test(className) ? "-" : "+";
  const focus = /focus:/.test(className);
  const hover = /hover:/.test(className);

  const value =
    typeof valueStr === "undefined" ? true : !/\D/.test(valueStr) ? parseInt(`${sign}${valueStr}`) : valueStr;

  return { name, value, prefix, breakpoint, focus, hover };
}

export default splitClassName;
