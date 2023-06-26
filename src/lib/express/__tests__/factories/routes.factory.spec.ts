import { describe, it, expect } from "vitest";
import {
  MockRequest,
  MockResponse,
  Routes,
  makeRouterGenerator,
  makeTypeRoutes,
} from "./mocks";

describe("Router Generator", () => {
  it("should return router", () => {
    const { generator, routes } = makeRouterGenerator();

    const router = generator.make();

    expect(router).toBeDefined();
    expect(router.stack.length).toBe(routes.length);
  });

  describe("create routes", () => {
    it("should create routes with POST type", () => {
      const routes = makeTypeRoutes("post").map(({ route }) => route.path);

      expect(routes.toString()).toBe(Routes.post.toString());
    });

    it("should create routes with GET type", () => {
      const routes = makeTypeRoutes("get").map(({ route }) => route.path);

      expect(routes.toString()).toBe(Routes.get.toString());
    });

    it("should create routes with DELETE type", () => {
      const routes = makeTypeRoutes("delete").map(({ route }) => route.path);

      expect(routes.toString()).toBe(Routes.delete.toString());
    });

    it("should create routes with PUT type", () => {
      const routes = makeTypeRoutes("put").map(({ route }) => route.path);
      expect(routes.toString()).toBe(Routes.put.toString());
    });

    it("should create routes with PATCH type", () => {
      const routes = makeTypeRoutes("patch").map(({ route }) => route.path);
      expect(routes.toString()).toBe(Routes.patch.toString());
    });
  });

  describe("handle routes", () => {
    it("should handle without args", async () => {
      const route = makeTypeRoutes("get").filter(
        ({ route }) => route.path === ""
      )[0].route.stack[0];

      const response = await route.handle(MockRequest, MockResponse);

      expect(response).toBe("findAll");
    });

    it("should handle with args and no parameter", async () => {
      const route = makeTypeRoutes("post").filter(
        ({ route }) => route.path === ""
      )[0].route.stack[0];

      const response = await route.handle(MockRequest, MockResponse);

      expect(response.body).toBe(MockRequest.body);
      expect(response.query).toBe(MockRequest.query);
      expect(response.res).toBe(MockResponse);
      expect(response.req).toBe(MockRequest);
    });

    it("should handle with args and parameter", async () => {
      const route = makeTypeRoutes("patch")[0].route.stack[0];

      const response = await route.handle(MockRequest, MockResponse);

      expect(response.body).toBe(MockRequest.body.name);
      expect(response.query).toBe(MockRequest.query.name);
      expect(response.res).toBe(MockResponse.json);
      expect(response.req).toBe(MockRequest.body);
    });
  });
});
