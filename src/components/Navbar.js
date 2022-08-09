import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import Invite from "./Invite";
import AddData from "./AddData";
import EditData from "./EditData";
import LinkDiscord from "./LinkDiscord";

const Navbar = () => {
  const { user, logOut, googleSignIn } = UserAuth();
  const navigate = useNavigate();
  let { compName } = useParams();

  //if the user is not on a comp page, dont show add or edit buttons.
  const isCompPage = window.location.pathname.includes("comp");
  let dataButtons;
  if (isCompPage) {
    dataButtons = (
      <div>
        <button
          className="button mr-2"
          onClick={() => setShowAdd((currentShow) => !currentShow)}
        >
          Add Data
        </button>
        <button
          className="button mr-2"
          onClick={() => setShowEdit((currentShow) => !currentShow)}
        >
          Weigh In
        </button>
        <button
          className="button mr-2"
          onClick={() => setShowLink((currentShow) => !currentShow)}
        >
          Link
        </button>
        <button
          className="button mr-2"
          onClick={() => setShowInvite((currentShow) => !currentShow)}
        >
          Invite
        </button>
      </div>
    );
  }

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

  // useEffect(() => {
  //   if (user != null) {
  //     navigate("/");
  //   }
  // }, [user]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="flex justify-between list-item bg-white w-full p-4 mb-10">
      {user ? (
        <div className=" justify-between flex">
          {dataButtons}
          <div>
            <button className="button" onClick={handleSignOut}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button className="button" onClick={handleGoogleSignIn}>
          SignIn
        </button>
      )}
      <div>
        {console.log(isCompPage)}

        {showAdd && user ? <AddData /> : null}
        {showEdit && user ? <EditData /> : null}
        {showLink && user ? <LinkDiscord /> : null}
        {showInvite && user ? <Invite /> : null}
      </div>
    </div>
  );
};

export default Navbar;
