import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';
import Motivation from './pages/Motivation';
import { useState } from 'react';

// Quiz state context passed via search params / component state
// We use a simple approach: pass score/total via router search

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: Quiz,
});

const quizResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/results',
  component: QuizResults,
});

const motivationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/motivation',
  component: Motivation,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  quizRoute,
  quizResultsRoute,
  motivationRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
