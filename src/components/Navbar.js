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
import {motion} from "framer-motion";
import useMeasure from "react-use-measure";
import Transitions from "./Transitions";

const Navbar = () => {
  const [ref, {height}] = useMeasure();
  //State handers for showing and hiding modals
  const [showAdd, setShowAdd] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showRemoveUser, setShowRemoveUser] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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
          onClick={() => {
            setShowAdd((prev) => !prev);
            setShowLink(false);
            setShowInvite(false);
            setShowRemoveUser(false);
            setShowInfo(false);
          }}
        >
          Weigh In
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => {
            setShowLink((prev) => !prev);
            setShowAdd(false);
            setShowInvite(false);
            setShowRemoveUser(false);
            setShowInfo(false);
          }}
        >
          Link
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => {
            setShowInvite((prev) => !prev);
            setShowAdd(false);
            setShowLink(false);
            setShowRemoveUser(false);
            setShowInfo(false);
          }}
        >
          Invite
        </button>
        <button
          className="button mr-2 mb-2"
          onClick={() => {
            setShowRemoveUser((prev) => !prev);
            setShowAdd(false);
            setShowLink(false);
            setShowInvite(false);
            setShowInfo(false);
          }}
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
    try {
      const {uid} = user;
      //If the user is on a comp page, check if they are an admin
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
              onClick={() => {
                setShowInfo((prev) => !prev);
                setShowAdd(false);
                setShowLink(false);
                setShowInvite(false);
                setShowRemoveUser(false);
              }}
            >
              Admin
            </button>
          </div>
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [user, navigate, compName, isAdmin, isCompPage]);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <motion.div className="justify-between list-item bg-white w-full p-4 mb-10">
      <Transitions>
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
        <motion.div
          initial={{opacity: 0}}
          animate={{
            opacity: 1,
            height:
              showAdd || showLink || showInvite || showRemoveUser || showInfo
                ? height + 60
                : height,
          }}
          key={height}
        >
          {showAdd && user ? <AddData /> : null}
          {showLink && user ? <LinkDiscord /> : null}
          {showInvite && user ? <Invite /> : null}
          {showRemoveUser && user ? <RemoveUser /> : null}
          {showInfo && user ? <Info /> : null}
        </motion.div>
      </Transitions>
    </motion.div>
  );
};

export default Navbar;
