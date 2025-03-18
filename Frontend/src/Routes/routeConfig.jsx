import { Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Interview from "../pages/Interview/Interview";
import InterviewSetup from "../pages/Interview/InterviewSetup/InterviewSetup";

// Define public routes
export const publicRoutes = [
  { path: "/", component: <Home /> },
  {
    path: "/signUp",
    component: <SignUp />,
  },
 
];

// Define protected routes
export const protectedRoutes = [
  {
    path: "/interviewSetup",
    component: <InterviewSetup />,
  },
  {
    path: "/interview",
    component: <Interview />,
  },
];
