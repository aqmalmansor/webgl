import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ErrorContainer, NotFoundContainer } from "@app/components/containers";
import { HomePage } from "@app/components/pages/home";
import { ThreePage } from "@app/components/pages/three";

export const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add public routes here */}
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/three"} element={<ThreePage />} />
        <Route path={"/error"} element={<ErrorContainer />} />
        <Route path={"/not-found"} element={<NotFoundContainer />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};
