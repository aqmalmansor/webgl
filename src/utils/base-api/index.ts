import { type AxiosError } from "axios";

import { BASE_API_URL } from "@app/lib/config";
import { LOGIN_PATH } from "@app/lib/paths";

import { authHelper } from "../helpers";
import { isErrorResponse } from "../is-error-response";
import { BaseApi as BaseApiMemo, type BaseErrorResponse } from "./config";

const getUrl = (path: string) => `${BASE_API_URL}${path}`;

const onHandleError = async (
  e: AxiosError<unknown, BaseErrorResponse>,
): Promise<AxiosError<unknown, BaseErrorResponse>> => {
  if (isErrorResponse(e.response?.data)) {
    switch (e.response?.data.error.name) {
      case "NotFound":
      case "Forbidden":
        window.location.href = LOGIN_PATH;
        break;
      case "Unauthorized":
      case "Unauthenticated":
        authHelper.clearAuthToken();
        window.location.href = LOGIN_PATH;
        break;
      default:
        return Promise.reject(e.response?.data);
    }
  }

  return Promise.reject(e);
};

export const BaseApi = BaseApiMemo(getUrl, onHandleError);
