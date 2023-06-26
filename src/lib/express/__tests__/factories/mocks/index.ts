import "reflect-metadata";
import {
  Post,
  Body,
  Get,
  Query,
  Delete,
  Put,
  Patch,
  Res,
  Req,
  All,
} from "../../../decorators";
import { RouterGenerator } from "../../../factories";
import { ReflectMetadata } from "../../../types";

export class MockController {
  @Post()
  create(
    @Query() query: any,
    @Body() body: any,
    @Req() req: any,
    @Res() res: any
  ) {
    return {
      body,
      query,
      req,
      res,
    };
  }

  @Get()
  findAll() {
    return "findAll";
  }

  @Get(":id")
  findOne() {
    return "findOne";
  }

  @Delete(":id")
  delete() {
    return "delete";
  }

  @Patch(":id")
  patch(
    @Query("name") query: any,
    @Body("name") body: any,
    @Res("json") res: any,
    @Req("body") req: any
  ) {
    return { query, body, res, req };
  }

  @Put(":id")
  put() {
    return "put";
  }

  @All("testing")
  testing() {
    return "testing";
  }
}

export const Routes = {
  post: [""],
  get: ["", ":id"],
  delete: [":id"],
  put: [":id"],
  patch: [":id"],
  all: ["testing"],
};

export const MockRequest = {
  query: { name: "query" },
  body: { name: "body" },
};

export const MockResponse = {
  json: (data: any) => data,
};

export const makeTypeRoutes = (type: string) => {
  const { generator } = makeRouterGenerator();

  return generator.make().stack.filter(({ route }) => route.methods[type]);
};

export class MockReflectMetadata implements ReflectMetadata {
  getMetadata(key: string, target: any, propertyKey: any) {
    return Reflect.getMetadata(key, target, propertyKey);
  }
}

export const makeRouterGenerator = () => ({
  generator: new RouterGenerator({
    controller: new MockController(),
    model: MockController,
    reflect: new MockReflectMetadata(),
  }),

  routes: Object.getOwnPropertyNames(MockController.prototype).filter(
    (prop) => prop !== "constructor"
  ),
});
