import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/LogIn";
import Teams from "./pages/Teams";
import PublicRoute from "./components/PublicRoute";
import PriveteRoute from "./components/ProtectedRoute";
import useAuthCheck from "./hooks/useAuthCheck";
function App() {
  const authCheck = useAuthCheck();
  return !authCheck ? (
    <div>checking auth....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PriveteRoute>
              <>Project Management DAshboard lalalala</>
            </PriveteRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PriveteRoute>
              <Teams />
            </PriveteRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
