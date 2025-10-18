import { FC } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

import { DashboardContainer } from "@app/components/containers";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  PROTECTED_ROOT_PATH,
} from "@app/lib/paths";
import { useAuth } from "@app/store";

const ProtectedRoutes: FC = () => {
  const { authToken } = useAuth();

  if (!authToken) return <Navigate replace to={LOGIN_PATH} />;

  return (
    <div>
      {/* Wrap Outlet with fixed layout here */}
      <Outlet />
    </div>
  );
};

export const PrivateRoutes = () => {
  return (
    <Route>
      <Route path={PROTECTED_ROOT_PATH} element={<ProtectedRoutes />}>
        {/* Add protected routes here */}
        <Route path={DASHBOARD_PATH} element={<DashboardContainer />} />
        <Route path="*" element={<Navigate to={DASHBOARD_PATH} />} />
      </Route>
    </Route>
  );
};
