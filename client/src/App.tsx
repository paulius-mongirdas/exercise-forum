import React from "react";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Exercise from "./components/Exercise";

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
        <Route path="/api/categories/:id/exercises" element={<ExerciseListWrapper />} />
        <Route path="/api/categories/:id/exercises/:exerciseId" element={<ExerciseWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

const ExerciseListWrapper = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return <div>No category ID provided</div>;
  }

  return <Exercises categoryID={Number(id)} />;
};

const ExerciseWrapper = () => {
  const { id, exerciseId } = useParams<{ id?: string, exerciseId?: string }>();

  if (!id || !exerciseId) {
    return <div>No category ID or exercise ID provided</div>;
  }

  return <Exercise categoryId={Number(id)} id={Number(exerciseId)} />;
}
  
export default App;