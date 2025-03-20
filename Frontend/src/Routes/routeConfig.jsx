import { Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Interview from "../pages/Interview/InterviewProcess/Interview";
import InterviewSetup from "../pages/Interview/InterviewSetup/InterviewSetup";
import Feedback from "../pages/Interview/Feedback/Feedback";
import InterviewHistory from "../pages/Profile/InterviewHistory";
import SignIn from "../pages/Auth/SignIn/SignIn";

// Define public routes
export const publicRoutes = [
  { path: "/", component: <Home /> },
  {
    path: "/signUp",
    component: <SignUp />,
  },
  {
    path: "/signIn",
    component: <SignIn />,
  },
];

// Define protected routes
export const protectedRoutes = [
  {
    path: "/interview/setup",
    component: <InterviewSetup />,
  },
  {
    path: "/interview",
    component: <Interview />,
  },
  {
    path: "/interview/Feedback",
    component: <Feedback />,
  },
  {
    path: "/profile/interview/history",
    component: <InterviewHistory />,
  },
];
