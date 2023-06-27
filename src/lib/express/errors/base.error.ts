export class BaseError {
  error: string;

  status: number;

  constructor({ error, status }: BaseError) {
    this.error = error;
    this.status = status;
  }
}
