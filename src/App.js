import React from "react";
import Navbar from "./components/Navbar";
import {AuthContextProvider, UserAuth} from "./context/AuthContext";
import Home from "./routes/Home";

function App() {
  return (
    <div className="">
      <AuthContextProvider>
        <Navbar />
        <Home />
      </AuthContextProvider>
    </div>
  );
}

export default App;
