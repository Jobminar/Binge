import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AdminAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (storedLoggedIn) {
      setLoggedIn(true);
    }

    setLoading(false);
  }, []);

  const handleLogin = () => {
    // Implement your login logic
    setLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    // Implement your logout logic
    setLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    navigate("/adminlogin");
  };

  return (
    <Routes>
      {!isLoading && (
        <>
          <Route
            path="adminlogin"
            element={<AdminLogin handleLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <AdminDashboard handleLogout={handleLogout} />
              ) : (
                <AdminLogin handleLogin={handleLogin} />
              )
            }
          />
        </>
      )}
    </Routes>
  );
};

export default AdminAuth;
