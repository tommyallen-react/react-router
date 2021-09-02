import { matchRoutes } from "react-router";
import type { PartialRouteObject } from "react-router";

describe("absolute path matching", () => {
  function pickPaths(routes: PartialRouteObject[], pathname: string): string[] {
    let matches = matchRoutes(routes, { pathname });
    return matches ? matches.map(match => match.route.path) : [];
  }

  it("matches absolutely when path starts with /", () => {
    let routes: PartialRouteObject[] = [
      {
        path: "/users",
        children: [
          { index: true },
          { path: "add" },
          { path: "remove" },
          { path: "/users/:id" }
        ]
      }
    ];
    expect(pickPaths(routes, "/users")).toEqual(["/users", ""]);
    expect(pickPaths(routes, "/users/add")).toEqual(["/users", "add"]);
    expect(pickPaths(routes, "/users/remove")).toEqual(["/users", "remove"]);
    expect(pickPaths(routes, "/users/123")).toEqual(["/users", ":id"]);
  });

  it.todo("matches when the path matches");
  it.todo("throws when the nested path does not begin with its parent path");
});
