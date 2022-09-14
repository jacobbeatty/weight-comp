import React from "react";
import {useState, useEffect} from "react";
import {db} from "../firebase-config";
import {collection, onSnapshot} from "firebase/firestore";
import {useSearchParams} from "react-router-dom";

const Chart = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, props.compName), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    );
  });
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user.chart}
            className="w-[95vw]  h-[49vh] sm:h-[40vh]    drop-shadow-xl flex justify-center items-end p-2"
          >
            Date3{user.date3}
          </div>
        );
      })}
    </div>
  );
};

export default Chart;
