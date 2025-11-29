// src/components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;      // Permite pasar JSX, Layouts o cualquier contenido
  requireAdmin?: boolean;   // Opcional, para rutas de administrador
}

export const ProtectedRoute = ({ children, requireAdmin }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Mientras carga la sesión, mostramos loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario, redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere admin pero el usuario no lo es, redirige al dashboard
  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Todo bien, renderiza el contenido
  return <>{children}</>;
};

