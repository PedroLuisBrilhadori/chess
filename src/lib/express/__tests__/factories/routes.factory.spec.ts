import { describe, it, expect } from "vitest";
import { Routes, makeRouterGenerator, makeTypeRoutes } from "./mocks";

describe("Router Generator", () => {
  it("should return router", () => {
    const { generator, routes } = makeRouterGenerator();

    const router = generator.make();

    expect(router).toBeDefined();
    expect(router.stack.length).toBe(routes.length);
  });

  describe("create routes", () => {
    it("should create routes with POST type", () => {
      const routes = makeTypeRoutes("post");

      expect(routes.toString()).toBe(Routes.post.toString());
    });

    it("should create routes with GET type", () => {
      const routes = makeTypeRoutes("get");

      expect(routes.toString()).toBe(Routes.get.toString());
    });

    it("should create routes with DELETE type", () => {
      const routes = makeTypeRoutes("delete");

      expect(routes.toString()).toBe(Routes.delete.toString());
    });

    it("should create routes with PUT type", () => {
      const routes = makeTypeRoutes("put");
      expect(routes.toString()).toBe(Routes.put.toString());
    });

    it("should create routes with PATCH type", () => {
      const routes = makeTypeRoutes("patch");
      expect(routes.toString()).toBe(Routes.patch.toString());
    });
  });
});
