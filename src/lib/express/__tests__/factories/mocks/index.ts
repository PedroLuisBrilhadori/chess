import "reflect-metadata";
import {
  Controller,
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

@Controller("mock")
export class MockController {
  @Post()
  create(@Body() dto) {
    return "create";
  }

  @Get()
  findAll() {
    return "findAll";
  }

  @Get(":id")
  findOne(@Query("max") id: any) {
    return "findOne";
  }

  @Delete(":id")
  delete(@Query("id") id: any) {
    return "delete";
  }

  @Patch(":id")
  patch(@Query("id") id, @Body() dto) {
    return "patch";
  }

  @Put(":id")
  put(@Query("id") id, @Body() dto) {
    return "put";
  }

  @Get("other")
  getOther(@Res() res: Response) {
    return "getOther";
  }

  @Post("other")
  postOther(@Req() req: Request) {
    return "postOther";
  }

  @Delete("other")
  deleteOther(@Req() req: Request, @Res() res: Response) {
    return "deleteOther";
  }

  @All("testing")
  testing() {
    return "testing";
  }
}

export const Routes = {
  post: ["", "other"],
  get: ["", ":id", "other"],
  delete: [":id", "other"],
  put: [":id"],
  patch: [":id"],
  all: ["testing"],
};

export const makeTypeRoutes = (type: string) => {
  const { generator } = makeRouterGenerator();

  return generator
    .make()
    .stack.filter(({ route }) => route.methods[type])
    .map(({ route }) => route.path);
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
