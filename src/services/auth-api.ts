import { Auth } from "@app/typings";
import { BaseApi } from "@app/utils";

interface LoginPayload {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  email: string;
}

interface ResetPasswordResponse {
  isEmailSent: boolean;
}

const model = "/v1/auth";

export const AuthApi = {
  login: async (body: LoginPayload): Promise<Auth> =>
    BaseApi.post({
      path: `${model}/login`,
      body,
    }),
  resetPassword: async (
    body: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> =>
    BaseApi.post({
      path: `${model}/reset-password`,
      body,
    }),
};
