import {React, useState, useEffect} from "react";
import {UserAuth} from "../context/AuthContext";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const CompList = () => {
  const {user} = UserAuth();
  const navigate = useNavigate();

  //state for compList
  const [compList, setCompList] = useState([]);

  useEffect(() => {
    if (!user) return;

    const {uid} = user;

    //make ref to userInfo
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
          <a
            className="text-white text-2xl"
            onClick={() => {
              navigate(`/comp/${comp}`);
            }}
          >
            {comp}➜
          </a>
        </div>
      ))}
    </div>
  );
};

export default CompList;
