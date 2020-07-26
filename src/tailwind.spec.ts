import { getTailWindCss } from "./tailwind";

describe("tailwind", () => {
  test("can read tailwind.css", async () => {
    await expect(getTailWindCss()).resolves.toEqual(expect.any(String));
  });

  test("generates the expected TypeScript interface", () => {});
});
