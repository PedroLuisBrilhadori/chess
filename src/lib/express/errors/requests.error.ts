import { BaseError } from "./base.error";

export const InternalServerException = () =>
  new BaseError({
    error: "Internal Server Error",
    status: 500,
  });

export class AlreadyExistsException extends BaseError {
  resource: string;

  constructor(resource: string) {
    const error = `The resource: ${resource} already existis`;
    const status = 400;

    super({ error, status });

    this.resource = resource;
  }
}
