// import React from "react";
// import {useState, useEffect} from "react";
// import {app} from "../firebase-config";
// import {doc, updateDoc, getDoc} from "firebase/firestore";
// import {db} from "../firebase-config";
// import {getAuth} from "firebase/auth";
// import {useParams} from "react-router-dom";
// import * as yup from "yup";
// import {useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";

// const EditData = () => {
//   //Grab compName from url
//   let {compName} = useParams();
//   //Generate schema for yup validation of form
//   const schema = yup.object().shape({
//     currentWeight: yup
//       .number("Must be a number.")
//       .typeError("Must be a number.")
//       .required("Please include a starting weight.")
//       .positive("Must be positive."),
//   });
//   //Generate form hook
//   const {
//     register,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const auth = getAuth(app);
//   const uid = auth.currentUser.uid;
//   const usersRef = doc(db, compName, uid);
//   const [user, setUser] = useState({});
//   //Handle form submission and update user's current weight as well as recalculate their weight loss percentage.
//   const onSubmit = async (e) => {
//     const percentageLost = (
//       ((user.startingWeight - e.currentWeight) / user.startingWeight) *
//       100
//     ).toFixed(2);

//     //Update the user's current weight and weight loss percentage
//     await updateDoc(usersRef, {
//       currentWeight: e.currentWeight,
//       percentageLost: percentageLost,
//     });
//   };

//   //Get the user's data from the database and set it to the user state
//   useEffect(() => {
//     const getUser = async () => {
//       const snap = await getDoc(usersRef);
//       setUser({uid, ...snap.data()});
//     };
//     getUser();
//   }, []);

//   return (
//     <form
//       className="form flex flex-col flex-wrap  mt-2"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div>
//         <input
//           className="w-[45%] sm:w-[10vw]  border-solid border-2 border-fuchsia-400"
//           placeholder="Current Weight"
//           {...register("currentWeight")}
//         />
//         <button className="button mt-2" type="submit">
//           Submit
//         </button>
//       </div>
//       <p>{errors.currentWeight?.message}</p>
//     </form>
//   );
// };

// export default EditData;
