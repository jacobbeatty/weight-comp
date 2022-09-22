import React, {useEffect, useState} from "react";
import {UserAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import Invite from "./Invite";
import AddData from "./AddData";
import LinkDiscord from "./LinkDiscord";
import RemoveUser from "./RemoveUser";
import Info from "./Info";
import {db} from "../firebase-config.js";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

const Navbar = () => {
  //Grab compName from url
  let {compName} = useParams();
  const {user, logOut, googleSignIn} = UserAuth();
  const navigate = useNavigate();
  //Check if the user is on a comp page
  const isCompPage = window.location.pathname.includes("/comp/");
  //If the user is on a comp page, show add, link, invite, and leave.
  let dataButtons;
  if (isCompPage) {
    dataButtons = (
      <div>
        <button
          className="button mr-2 mb-2"
          onClick={() => setShowAdd((currentShow) => !currentShow)}
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminButtons, setAdminButtons] = useState();

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
    //if the user is not logged in, redirect to home page
    if (user == null) {
      navigate("/");
    }
    const {uid} = user;
    if (isCompPage) {
      const getCompInfo = async () => {
        try {
          const compInfoRef = doc(db, "compInfo", compName);
          const compInfoSnap = await getDoc(compInfoRef);
          const compInfo = compInfoSnap.data();
          if (compInfo.admins.includes(uid)) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getCompInfo();
    }
    //If user is the admin of the comp, show the Info button
    if (isCompPage && isAdmin) {
      setAdminButtons(
        <div>
          <button
            className="button mr-2 mb-2"
            onClick={() => setShowInfo((currentShow) => !currentShow)}
          >
            Admin
          </button>
        </div>
      );
    }
  }, [user, navigate, compName, isAdmin, isCompPage]);
  //State handers for showing and hiding modals
  const [showAdd, setShowAdd] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showRemoveUser, setShowRemoveUser] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="justify-between list-item bg-white w-full p-4 mb-10">
      {user ? (
        <div className=" justify-between flex">
          <div className="flex">
            {dataButtons}
            {adminButtons}
          </div>

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
        {showLink && user ? <LinkDiscord /> : null}
        {showInvite && user ? <Invite /> : null}
        {showRemoveUser && user ? <RemoveUser /> : null}
        {showInfo && user ? <Info /> : null}
      </div>
    </div>
  );
};

export default Navbar;
