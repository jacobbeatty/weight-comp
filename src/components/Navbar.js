import React, {useEffect, useState} from "react";
import {UserAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import Invite from "./Invite";
import AddData from "./AddData";
import EditData from "./EditData";
import LinkDiscord from "./LinkDiscord";
import RemoveUser from "./RemoveUser";

const Navbar = () => {
  const {user, logOut, googleSignIn} = UserAuth();
  const navigate = useNavigate();

  //if the user is not on a comp page, dont show add or edit buttons.
  const isCompPage = window.location.pathname.includes("comp");
  let dataButtons;
  if (isCompPage) {
    dataButtons = (
      <div>
        <button
          className="button mr-2 mb-2"
          onClick={() => setShowAdd((currentShow) => !currentShow)}
        >
          Add Data
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => setShowEdit((currentShow) => !currentShow)}
        >
          Weigh In
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => setShowLink((currentShow) => !currentShow)}
        >
          Link
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => setShowInvite((currentShow) => !currentShow)}
        >
          Invite
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => setShowRemoveUser((currentShow) => !currentShow)}
        >
          Leave Comp
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
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showRemoveUser, setShowRemoveUser] = useState(false);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="justify-between list-item bg-white w-full p-4 mb-10">
      {user ? (
        <div className=" justify-between flex">
          {dataButtons}
          <div>
            <button className="button mr-2 mb-2" onClick={handleSignOut}>
              Logout
            </button>
            <button className="button" onClick={navigateHome}>
              Home
            </button>
          </div>
        </div>
      ) : (
        <button className="button" onClick={handleGoogleSignIn}>
          Sign In
        </button>
      )}
      <div>
        {showAdd && user ? <AddData /> : null}
        {showEdit && user ? <EditData /> : null}
        {showLink && user ? <LinkDiscord /> : null}
        {showInvite && user ? <Invite /> : null}
        {showRemoveUser && user ? <RemoveUser /> : null}
      </div>
    </div>
  );
};

export default Navbar;
