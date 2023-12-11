"use client";

import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const StartVoteModal = ({ onClose }) => {
  const [electEndTime, setElectEndTime] = useState(0);

  const handleSubmit = () => {
    console.log("Name");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="z-10 bg-[#e9e1da] p-2 rounded-xl shadow-lg text-gray-900 flex flex-col w-[50%]">
        <div
          onClick={onClose}
          className="text-xl text-gray-500 mb-2 cursor-pointer ml-auto"
        >
          <IoCloseCircle />
        </div>
        <div className=" flex justify-center items-center">
          <form onSubmit={handleSubmit} className="">
            <label>
              Submit Election End-Time:
              <br />
              <input
                className="py-2 px-2 border  border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2 focus:ring-0"
                type="datetime-local"
                placeholder="set election. start date and time"
                onChange={(e) => {
                  const timeString = e.target.value;
                  const date = new Date(timeString);
                  const epochTime = Math.floor(date.getTime() / 1000);
                  setElectEndTime(epochTime);
                }}
              />
            </label>

            <div className=" flex justify-center items-center">
              <button
                className="py-2 outline-none my-4 w-full hover:bg-[#d18d8c] bg-[#cf716e] text-white font-semibold rounded-lg"
                type="submit"
              >
                Start Vote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartVoteModal;
