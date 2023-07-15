import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function ValidationPipe(
  schema: new () => {},
  requestObject: Object
) {
  const transformedClass: any = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);

  return errors;
}
