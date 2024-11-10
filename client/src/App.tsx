import React from "react";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";

const UseNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { params } = useParams();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        navigate("/api/home");
        break;
      case "/api":
        navigate("/api/home");
        break;
      case "/api/login":
      case "/api/register":
        // Do nothing, just return an empty fragment
        break;
      case "/api/home":
        // Render the <Home /> component
        break;
      default:
        // Render the <Nav /> component in all other cases
        break;
    }
  }, [location.pathname, navigate]);

  if (location.pathname === "/api/login" || location.pathname === "/api/register") {
    return <></>;
  }

  return <Nav />;
};

function App() {
  return (
    <BrowserRouter>
      <UseNav />
      <Routes>
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;