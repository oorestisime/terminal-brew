import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("coffees", "routes/coffees.tsx"),
  route("coffee/:id", "routes/coffee-detail.tsx"),
  route("methods", "routes/methods.tsx"),
  route("method/:id", "routes/method-detail.tsx"),
  route("about", "routes/about.tsx")
] satisfies RouteConfig;