import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import ApeAi from "./pages/ApeAi";
import Home from "./pages/Home";
import Motivation from "./pages/Motivation";
import NeetQuiz from "./pages/NeetQuiz";
import NeetQuizResults from "./pages/NeetQuizResults";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";

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

const neetQuizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/neet-quiz",
  component: NeetQuiz,
});

const neetQuizResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/neet-quiz/results",
  component: NeetQuizResults,
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

const apeAiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ape-ai",
  component: ApeAi,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  quizRoute,
  quizResultsRoute,
  neetQuizRoute,
  neetQuizResultsRoute,
  motivationRoute,
  apeAiRoute,
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
