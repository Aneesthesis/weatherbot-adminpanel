import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Login from "./components/Login";
import { adminActions } from "./Store/admin-slice";

const App = () => {
  useEffect(() => {
    function checkLogin() {
      const admin = JSON.parse(localStorage.getItem("admin"));
      if (!admin) {
        adminActions.setLoggedIn(false);
      } else {
        adminActions.setLoggedIn(true);
      }
    }
    checkLogin();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
