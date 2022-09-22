import {React, useState, useEffect} from "react";
import {UserAuth} from "../context/AuthContext";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const CompList = () => {
  const {user} = UserAuth();
  const navigate = useNavigate();
  const [compList, setCompList] = useState([]);

  //Get list of comps user is in from userInfo collection and store in compList state
  useEffect(() => {
    if (!user) return;
    const {uid} = user;
    const getCompList = async () => {
      try {
        const userInfoRef = doc(db, "userInfo", uid);
        const userInfoSnap = await getDoc(userInfoRef);
        const compList = userInfoSnap.data().comps;
        setCompList(compList);
      } catch (error) {
        console.log(error);
      }
    };
    getCompList();
  }, [user]);

  return (
    <div>
      {compList.map((comp) => (
        <div key={comp}>
          <button
            className="text-white text-2xl"
            onClick={() => {
              navigate(`/comp/${comp}`);
            }}
          >
            {comp}➜
          </button>
        </div>
      ))}
    </div>
  );
};

export default CompList;
