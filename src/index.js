import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./routes/Home";
import Start from "./routes/Start";
import Comp from "./routes/Comp";
import {AuthContextProvider} from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="home" element={<Home />} />
          <Route
            path="start"
            element={
              <ProtectedRoute>
                <Start />
              </ProtectedRoute>
            }
          />
          <Route
            path="comp/:compName"
            element={
              <ProtectedRoute>
                <Comp />
              </ProtectedRoute>
            }
          />
          <Route
            path="comp/:compName/:inviteCode"
            element={
              <ProtectedRoute>
                <Comp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
