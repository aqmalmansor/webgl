import { useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { TextInput } from "@app/components/ui";
import { DASHBOARD_PATH } from "@app/lib/paths";
import { AuthApi } from "@app/services";
import { useAuth } from "@app/store";

import {
  FormValues,
  initialState,
  toastOptions,
  validationSchema,
} from "./config";

export const LoginContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const { setAuthToken } = useAuth();

  const onSubmit = async (value: FormValues) => {
    try {
      setIsLoading(true);

      if (isResetPassword) {
        await AuthApi.resetPassword({
          email: value.email ?? "",
        });

        setEmailSent(true);
      } else {
        const { authToken } = await AuthApi.login({
          email: value.email ?? "",
          password: value.password ?? "",
        });

        if (authToken) {
          setAuthToken(authToken);
          navigate(DASHBOARD_PATH);
        }
      }

      toast.success(
        isResetPassword ? "Password reset successfully" : "Login successful",
        toastOptions,
      );
    } catch (e) {
      toast.error(
        isResetPassword ? "Password reset failed" : "Please try again",
        toastOptions,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex display={"flex"} align={"center"} height={"100vh"} justify={"center"}>
      <Formik<FormValues>
        initialValues={initialState}
        validationSchema={validationSchema(isResetPassword)}
        onSubmit={(val) => onSubmit(val)}
      >
        {({ values: { email }, setValues, submitForm }) => (
          <Form noValidate style={{ width: "100%", maxWidth: "480px" }}>
            <Flex
              direction={"column"}
              justify={"start"}
              className={"border shadow-md md:p-8 p-5 rounded-md"}
            >
              {isResetPassword && emailSent ? (
                "A password reset link has been sent to your email"
              ) : (
                <TextInput
                  name={"email"}
                  label={"Email"}
                  helperText={"Please enter your email"}
                />
              )}
              {!isResetPassword && (
                <TextInput
                  name={"password"}
                  label={"Password"}
                  type={"password"}
                  helperText={"Please enter your password"}
                />
              )}
              <Flex
                width={"100%"}
                justify={"between"}
                wrap={"wrap"}
                mt={"3"}
                gap={"5"}
              >
                <Button
                  disabled={isLoading}
                  type={"reset"}
                  variant={"ghost"}
                  onClick={() => {
                    isResetPassword
                      ? [setIsResetPassword(false), setEmailSent(false)]
                      : [
                          setValues({
                            email,
                            password: null,
                          }),
                          setIsResetPassword(true),
                        ];
                  }}
                >
                  {isResetPassword ? "Cancel" : "Forgot your password?"}
                </Button>
                <Button
                  disabled={isLoading}
                  type={"submit"}
                  onClick={submitForm}
                >
                  {isResetPassword ? "Reset Password" : "Login"}
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};
