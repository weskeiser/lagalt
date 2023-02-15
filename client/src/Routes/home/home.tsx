import { QueryClient } from "@tanstack/react-query";
import { RootRoute, Route } from "@tanstack/react-router";
import { Feed } from "../../Features/Feed";

export const homeRoute = (rootRoute: RootRoute, queryClient: QueryClient) =>
  new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    onLoad: () =>
      queryClient.ensureQueryData({
        queryKey: ["feed"],
        queryFn: () => 5,
        // fetch("localhost:8080/projects")
        //   .then((res) => res.json())
        //   .then((data) => data),
      }),
    component: Feed,
    errorComponent: () => "3rr0rL0l",
  });
