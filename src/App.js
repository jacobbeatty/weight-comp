import React from "react";
import Navbar from "./components/Navbar";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import Home from "./routes/Home";
import Comp from "./routes/Comp";
import { db, app, auth } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";

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
