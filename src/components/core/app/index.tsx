import { FC, useEffect } from "react";
import { Theme } from "@radix-ui/themes";

import { AppRoutes } from "@app/components/core";
import { APP_VERSION, ENV_STAGE } from "@app/lib/config";

import "@radix-ui/themes/styles.css";
import "./App.css";

export const App: FC = () => {
  useEffect(() => {
    console.log(`Version: ${APP_VERSION} (${ENV_STAGE})`);
  }, []);

  return (
    <Theme>
      <AppRoutes />
    </Theme>
  );
};
