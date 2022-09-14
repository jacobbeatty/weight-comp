import {React} from "react";
import HomeCard from "../components/HomeCard";
import Start from "./Start";
import {UserAuth} from "../context/AuthContext";

const Home = () => {
  const {user, googleSignIn} = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" ">
      {user ? (
        <div className="flex justify-around items-center w-[100%] h-[100vh]">
          {/* <HomeCard>
            <a
              className="h-full w-full flex justify-center text-center items-center"
              href="/start"
            >
              START A COMP
            </a>
          </HomeCard> */}
          <Start />
        </div>
      ) : (
        <div className="flex justify-around items-center w-[100%] h-[100vh]">
          <HomeCard>
            <a
              className="h-full w-full flex justify-center text-center items-center cursor-pointer"
              onClick={handleGoogleSignIn}
            >
              SIGN IN
            </a>
          </HomeCard>
        </div>
      )}
    </div>
  );
};

export default Home;
