import { Route } from "@tanstack/react-router";
import { rootRoute } from "src/routes/__root";
import { Feed } from "src/features/Feed";
import { queryClient } from "src/index";
import { fetchUsers } from "src/api/v1/users";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  onLoad: () =>
    queryClient.ensureQueryData({
      queryKey: ["/users"],
      queryFn: fetchUsers,
    }),
  component: Feed,
});