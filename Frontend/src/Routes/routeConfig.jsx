import { Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Interview from "../pages/Interview/Interview";

// Define public routes
export const publicRoutes = [
  { path: "/", component: <Home /> },
  {
    path: "/signUp",
    component: <SignUp />,
  },
  {
    path: "/interview",
    component: <Interview />,
  },
];

// Define protected routes
export const protectedRoutes = [
  // { path: "/", component: <Home /> },
];
