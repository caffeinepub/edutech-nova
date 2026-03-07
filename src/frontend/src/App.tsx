import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Motivation from "./pages/Motivation";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";

// Quiz state context passed via search params / component state
// We use a simple approach: pass score/total/name via router search

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: Quiz,
});

const quizResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz/results",
  component: QuizResults,
  validateSearch: (search: Record<string, unknown>) => ({
    score: Number(search.score ?? 0),
    total: Number(search.total ?? 0),
    name: String(search.name ?? ""),
  }),
});

const motivationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/motivation",
  component: Motivation,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  quizRoute,
  quizResultsRoute,
  motivationRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { quizResultsRoute };

export default function App() {
  return <RouterProvider router={router} />;
}
