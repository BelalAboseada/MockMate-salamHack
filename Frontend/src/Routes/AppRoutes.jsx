import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { protectedRoutes, publicRoutes } from "./routeConfig";

const AppRoutes = () => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
    {protectedRoutes.map(({ path, component }) => (
      <Route
        key={path}
        path={path}
        element={<ProtectedRoute>{component}</ProtectedRoute>}
      />
    ))}
  </Routes>
);

export default AppRoutes;






// import { Routes, Route } from "react-router-dom";
// import { Suspense } from "react";
// import ProtectedRoute from "./ProtectedRoute";
// import { protectedRoutes, publicRoutes } from "./routeConfig";

// // Function to render routes
// const renderRoutes = (routes, isProtected = false) =>
//   routes.map(({ path, component }) => (
//     <Route
//       key={path}
//       path={path}
//       element={
//         isProtected ? (
//           <ProtectedRoute>
//             <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
//           </ProtectedRoute>
//         ) : (
//           <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
//         )
//       }
//     />
//   ));

// const AppRoutes = () => (
//   <Routes>
//     {renderRoutes(publicRoutes)}  {/* Public routes */}
//     {renderRoutes(protectedRoutes, true)}  {/* Protected routes */}
//   </Routes>
// );

// export default AppRoutes;
