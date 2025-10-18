import * as yup from "yup";

import { FIELD_REQUIRED_ERROR_MESSAGE } from "@app/lib/constants";

export const toastOptions = {
  id: "login",
};

export interface FormValues {
  email: Nullable<string>;
  password: Nullable<string>;
}

export const initialState: FormValues = {
  email: null,
  password: null,
};

export const validationSchema = (isResetPassword: boolean) =>
  yup
    .object({
      email: yup
        .string()
        .nullable()
        .email()
        .required(FIELD_REQUIRED_ERROR_MESSAGE),
    })
    .concat(
      yup.object(
        isResetPassword
          ? {}
          : {
              password: yup
                .string()
                .nullable()
                .required(FIELD_REQUIRED_ERROR_MESSAGE),
            },
      ),
    );
