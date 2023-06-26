import { describe, it, expect } from "vitest";
import { makeRouterGenerator } from "./mocks";

describe("Router Generator", () => {
  it("should return router", () => {
    const { generator, routes } = makeRouterGenerator();

    const router = generator.make();

    expect(router).toBeDefined();
    expect(router.stack.length).toBe(routes.length);
  });
});
