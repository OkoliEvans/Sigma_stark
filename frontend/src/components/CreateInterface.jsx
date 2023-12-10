"use client";

import React, { useState } from "react";
import { Contract, Provider, RpcProvider, constants } from "starknet";
import factoryABI from "../../utils/ABI/factoryABI.json";
import { useElectionId } from "@/context/ElectionIdContext";
import { FactoryAddress } from "../../utils/contractAddress";
import { useWallet } from "@/context/WalletContext";

const CreateInterface = () => {
  const [id, setid] = useState("");
  const [electionName, setElectionName] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState();

  const { generatedNumber } = useElectionId();
  const { account } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();

    id != generatedNumber
      ? setErrorMessage(
          "Entered ID does not match the generated ID. Please try again."
        )
      : "";

    console.log;

    try {
      const contract = new Contract(factoryABI, FactoryAddress(), account);
      await contract.create_election(
        Number(id),
        electionName,
        regStartDateAndTime,
        Number(tokenSupply)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex bg-[#f7ebeb] sm:px-16 px-6 justify-center items-start">
      <div className="xl:max-w-[1280px] w-full">
        <div className=" w-full shadow-lg rounded-2xl relative flex-col justify-center items-center bg-[#e9e1da] py-12 md:px-16 px-4 mb-12">
          <div className="flex flex-col justify-center items-center w-[100%]">
            <h2 className="font-semibold text-[#000] text-4xl mb-5">
              Create Your Election Here
            </h2>
            <p className="relative font-light text-[#000] text-2xl mb-8">
              Elevate Democracy: Initiate Your Own Election with Ease and
              Confidence
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center font-medium w-[100%]">
            <div className="flex justify-center items-center">
              <form onSubmit={handleSubmit} className="">
                <label>
                  Election ID:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2 appearance-none"
                    type="text"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                    value={id}
                    placeholder="Enter your Election ID"
                    onChange={(e) => setid(e.target.value)}
                  />
                  {errorMessage && (
                    <div className="text-red-500 text-sm">{errorMessage}</div>
                  )}
                </label>
                <label>
                  Election Name:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setElectionName(e.target.value)}
                  />
                </label>

                <br />
                <label>
                  Election start date and time:
                  <br />
                  <input
                    className="py-2 px-2 border  border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="datetime-local"
                    placeholder="set election. start date and time"
                    onChange={(e) => {
                      const timeString = e.target.value;
                      const date = new Date(timeString);
                      const epochTime = Math.floor(date.getTime() / 1000);
                      setRegStartDateAndTime(epochTime);
                    }}
                  />
                </label>
                <label>
                  Token Supply:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="text"
                    placeholder="Enter the Total Token Supply"
                    onChange={(e) => setTokenSupply(e.target.value)}
                  />
                </label>

                <button
                  className="py-2 outline-none mt-4 w-full hover:bg-[#d18d8c] bg-[#cf716e] text-white font-semibold rounded-lg"
                  type="submit"
                >
                  Create Election
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterface;
