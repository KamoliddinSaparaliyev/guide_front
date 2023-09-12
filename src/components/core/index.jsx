import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const expires_date = localStorage.getItem("expires_date");
    if (expires_date >= new Date()) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <>
      <Sidebar />
      <div className="home-section"> {children}</div>
    </>
  );
};
export default ProtectedRoute;
