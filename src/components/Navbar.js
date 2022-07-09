import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import AddData from "./AddData";
import EditData from "./EditData";

const Navbar = () => {
  const { user, logOut, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex justify-between list-item bg-white w-full p-4 mb-10">
      {user ? (
        <div className=" justify-between flex">
          <button
            className="button"
            onClick={() => setShowAdd((currentShow) => !currentShow)}
          >
            Add Data
          </button>
          <button
            className="button"
            onClick={() => setShowEdit((currentShow) => !currentShow)}
          >
            Weigh In
          </button>
          <button className="button" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      ) : (
        <button className="button" onClick={handleGoogleSignIn}>
          SignIn
        </button>
      )}
      <div>
        {showAdd && user ? <AddData /> : null}
        {showEdit && user ? <EditData /> : null}
      </div>
    </div>
  );
};

export default Navbar;
