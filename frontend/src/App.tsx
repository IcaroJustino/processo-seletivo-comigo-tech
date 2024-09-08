/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "./api/services/authService";
import Login from "./pages/login";
import Page404 from "./pages/404";
import AdminDashboard from "./pages/adminDashboard";
//import AttendantDashboard from "./pages/attendantDashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import { PrivateRoute } from "./api/types/config";
import { ReactNode } from "react";

export default function App() {

  //caso o usuario não esteja logado redireciona para a pagina de login
  function PrivateRoute({ children }: PrivateRoute) {
    return getToken() ? children : <Navigate to="/" replace />;
  }

  //rota caso o usuario ja esteja logado 
  function ProtectedLogin({ children }: PrivateRoute) {
    return getToken() ? <Navigate to="/dashboard" replace /> : children;
  }

  const getProtectedRoute = (index: number, path: string, Component: ReactNode) => {
    return (
      <Route
        key={index}
        path={path}
        element={<PrivateRoute>{Component}</PrivateRoute>}
      />
    );
  };

  const getAuthenticadedroutes = (key: number, path: string, Component: ReactNode) => {
    return (
      <Route key={key} path={path} element={<ProtectedLogin>{Component}</ProtectedLogin>} />
    );
  }

  const unprotectedRoutes = [
    { path: '/', component: <Login /> },
  ];

  const protectedRoutes = [
    { path: '/dashboard', component: <AdminDashboard /> },
  ];



  return (
    <Routes>
      {unprotectedRoutes.map((item: any, index: number) => getAuthenticadedroutes(index, item.path, item.component))}

      {protectedRoutes.map((item: any, index: number) => getProtectedRoute(index, item.path, item.component))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
