import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Voters = () => {
  const [verifyElectionId, setVerifyElectionId] = useState("");

  const route = useRouter();

  const handleSubmit = () => {
    console.log("Name");
    route.push("/");
  };
  return (
    <div className="flex bg-[#f7ebeb] sm:px-16 px-6 justify-center items-start">
      <div className="xl:max-w-[1280px] w-full">
        <div className=" w-full shadow-lg rounded-2xl relative flex-col justify-center items-center bg-[#e9e1da] py-12 md:px-16 px-4 mb-12">
          <div className="flex flex-col justify-center items-center w-[100%]">
            <h2 className="font-semibold text-[#000] text-4xl mb-5">
              Verify Election ID
            </h2>
            <p className="relative font-light text-[#000] text-2xl mb-8">
              Please verify your election ID here for a secure and accurate
              voting experience.
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center font-medium w-[100%]">
            <div className="flex justify-center items-center">
              <form onSubmit={handleSubmit} className="">
                <label>
                  <p className=" text-lg font-semibold">
                    {" "}
                    Kindly Verifiy The Election ID You Were Given:
                  </p>
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2 focus:ring-0 appearance-none"
                    type="text"
                    placeholder="Verify Election ID"
                    onChange={(e) => setVerifyElectionId(e.target.value)}
                    required
                  />
                </label>

                <div className=" flex justify-center items-center">
                  <button
                    className="py-2 outline-none my-4 w-full hover:bg-[#d18d8c] bg-[#cf716e] text-white font-semibold rounded-lg"
                    type="submit"
                  >
                    Verify ID
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voters;
