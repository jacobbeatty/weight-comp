import {React} from "react";
import HomeCard from "../components/HomeCard";
import Start from "../components/Start";
import CompList from "../components/CompList";
import {UserAuth} from "../context/AuthContext";
import Transitions from "../components/Transitions";

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
    <Transitions>
      <div className="w-[100%] h-[100vh] flex flex-col ">
        <h1 className="text-6xl font-bold text-white text-center h-[40%]">
          Challenge Your Friends
        </h1>
        {user ? (
          <div className="flex flex-col justify-around items-center h-[30%]">
            <Start />
            <h1 className="text-white font-semibold text-2xl">Your Comps:</h1>
            <CompList />
          </div>
        ) : (
          <div className="flex justify-center items-center h-[30%]">
            <HomeCard>
              <button
                className="h-full w-full flex justify-center text-center items-center cursor-pointer text-xl"
                onClick={handleGoogleSignIn}
              >
                Sign In to Start a Competition
              </button>
            </HomeCard>
          </div>
        )}
      </div>
    </Transitions>
  );
};

export default Home;
