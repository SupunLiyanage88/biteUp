import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

import RestaurantPage from "./views/resturantPage/ResturantPage";
import FoodsPage from "./views/foodsPage/FoodsPage";
import useAuth from "./customHooks/keycloak";
import ErrorPage from "./views/login/Errorpage";
import getUserDetails from "./customHooks/extractPayload";
import Admin from "./views/adminPage/AdminPage";
import PageLoader from "./components/PageLoader";
import UserProfile from "./views/userProfile/UserProfile";

const HomePage = React.lazy(() => import("./views/homePage/HomePage"));

const AppRoutes = () => {
  const isLogin = useAuth();
  const userDetails = getUserDetails();
  const role = userDetails?.role;
  return (
    <Suspense fallback={<PageLoader/>}>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              role === "Admin" ? (
                <Admin />
              ) : role == null ? (
                <HomePage />
              ) : (
                <ErrorPage />
              )
            ) : (
              <ErrorPage />
            )
          }
        />
        <Route
          path="/restaurant"
          element={isLogin ? <RestaurantPage /> : <ErrorPage />}
        />
        <Route
          path="/foods"
          element={isLogin ? <FoodsPage /> : <ErrorPage />}
        />
        <Route
          path="/profile"
          element={isLogin ? <UserProfile /> : <ErrorPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
