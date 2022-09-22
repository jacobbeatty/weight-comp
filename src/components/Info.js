import React from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  //Grab compName from url
  let {compName} = useParams();
  const handleDeleteComp = async () => {
    navigate("/");
  };
  return (
    <div>
      <button className="button mr-2 mb-2" onClick={handleDeleteComp()}>
        {compName}
      </button>
    </div>
  );
};

export default Info;
