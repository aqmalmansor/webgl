import { FC, ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  ErrorContainer,
  LoginContainer,
  NotFoundContainer,
} from "@app/components/containers";
import {
  DASHBOARD_PATH,
  ERROR_PATH,
  LOGIN_PATH,
  NOT_FOUND_PATH,
} from "@app/lib/paths";
import { authHelper } from "@app/utils";

import { PrivateRoutes } from "./private-routes";

// To redirect if authenticated user try to access default route
export const DefaultRoute: FC<{ element: ReactElement }> = ({ element }) => {
  const authToken = authHelper.getAuthToken();

  return authToken ? <Navigate to={DASHBOARD_PATH} replace /> : element;
};

export const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add public routes here */}
        <Route
          path={LOGIN_PATH}
          element={<DefaultRoute element={<LoginContainer />} />}
        />
        <Route path={ERROR_PATH} element={<ErrorContainer />} />
        <Route path={NOT_FOUND_PATH} element={<NotFoundContainer />} />
        <Route path="*" element={<Navigate to={LOGIN_PATH} />} />
        <PrivateRoutes />
      </Routes>
    </BrowserRouter>
  );
};
