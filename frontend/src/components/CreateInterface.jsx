"use client";

import React, { useState } from "react";

const CreateInterface = () => {
  const [participants, setParticipants] = useState(0);
  const [eNftName, setEnftName] = useState("");
  const [eNftSymbol, setENftSymbol] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [eventFee, setEventFee] = useState("");
  const [id, setid] = useState(0);
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const [regDeadline, setRegDeadline] = useState(0);
  const [eventUri, setEventUri] = useState("");
  const [eventDetails, setEventDetails] = useState({});
  const [tokenuri, setTokenUri] = useState("");
  const [contest, setContest] = useState("");

  const handleNftCreation = () => {
    console.log();
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
              <form onSubmit={handleNftCreation} className="">
                <label>
                  Vote ID:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2 "
                    type="number"
                    placeholder="Enter your Vote ID"
                    onChange={(e) => setid(e.target.value)}
                  />
                </label>
                <label>
                  Name:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setEnftName(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Vote NFT Symbol:
                  <br />
                  <input
                    className="py-2 px-2 border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="text"
                    placeholder="Vote NFT Symbol"
                    onChange={(e) => setENftSymbol(e.target.value)}
                  />
                </label>

                <br />
                <label>
                  Token URI:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="text"
                    placeholder="Election NFT Symbol"
                    onChange={(e) => setTokenUri(e.target.value)}
                  />
                </label>

                <br />
                <label>
                  Contest Name:
                  <br />
                  <input
                    className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="text"
                    placeholder="Event NFt sympol"
                    onChange={(e) => setContest(e.target.value)}
                  />
                </label>

                <br />
                <label>
                  Election start date and time:
                  <br />
                  <input
                    className="py-2 px-2 border text-gray-500 border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2"
                    type="datetime-local"
                    placeholder="set reg. start date and time"
                    onChange={(e) => {
                      const timeString = e.target.value;
                      const date = new Date(timeString);
                      const epochTime = Math.floor(date.getTime() / 1000);
                      setRegStartDateAndTime(epochTime);
                    }}
                  />
                </label>

                <br />
                <label>
                  Event image:
                  <br />
                  <input
                    className="py-2 px-2 border text-gray-500 border-gray-900 bg-gray-400 rounded-lg w-full mb-2"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                <button
                  className="py-2 outline-none mt-4 w-full hover:bg-[#d18d8c] bg-[#cf716e] text-white font-semibold rounded-lg"
                  type="submit"
                >
                  Upload Data
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
