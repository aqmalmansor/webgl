import { Button, Flex } from "@radix-ui/themes";

import { useAuth } from "@app/store";

export const DashboardContainer = () => {
  const { clearAuthToken } = useAuth();

  return (
    <Flex direction={"column"} gap={"4"}>
      <div>Dashboard</div>
      <Button onClick={() => clearAuthToken()}>Logout</Button>
    </Flex>
  );
};
