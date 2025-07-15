import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PATH from "./path";

// Layouts
import MainLayout from "../layouts/user/MainLayout";

// Pages

const HomePage = lazy(() => import("../pages/user/HomePage"));
const FavoritesPage = lazy(() => import("../pages/user/FavoritesPage"));
const SearchPage = lazy(() => import("../pages/user/SearchPage"));
const CartPage = lazy(() => import("../pages/user/CartPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const HistoriesPage = lazy(() => import("../pages/user/HistoriesPage"));
const WellRatedPage = lazy(() => import("../pages/user/WellRatedPage"));
const ForYouPage = lazy(() => import("../pages/user/ForYouPage"));
const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH.FAVORITES,
        element: <FavoritesPage />,
      },
      {
        path: PATH.SEARCH,
        element: <SearchPage />,
      },
      {
        path: PATH.CART,
        element: <CartPage />,
      },
      {
        path: PATH.HISTORIES,
        element: <HistoriesPage />,
      },
      {
        path: PATH.WELL_RATED,
        element: <WellRatedPage />,
      },
      {
        path: PATH.FOR_YOU,
        element: <ForYouPage />,
      },
    ],
  },
]);

export default router;