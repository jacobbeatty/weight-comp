import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Start from "./routes/Start";
import Comp from "./routes/Comp";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="home" element={<Home />} />
          <Route path="join" element={<Join />} />
          <Route path="start" element={<Start />} />
          <Route path="comp/:compName" element={<Comp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
