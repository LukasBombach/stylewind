import tailwindClasses from "./generated/classes";
import tailwindClassesRegex from "./tailwindClassesRegex";

describe("tailwindClassesRegex", () => {
  test.each(tailwindClasses)("the regex matches %s", (className) => {
    const regex = new RegExp(tailwindClassesRegex);
    expect(className).toMatch(regex);
  });
});
