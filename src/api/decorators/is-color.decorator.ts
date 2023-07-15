import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isColor", async: false })
export class IsColor implements ValidatorConstraintInterface {
  validate(color: string) {
    return color === "black" || color === "white";
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `this color: ${args.value} is not valid`;
  }
}
