import { ErrorResponse } from "@app/typings";

export const isErrorResponse = (param: unknown): param is ErrorResponse =>
  param instanceof Object &&
  Object.prototype.hasOwnProperty.call(param, "error");
