"use client";

import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const RemoveCandidateModal = ({ onClose }) => {
  const [canAddress, setCanAddress] = useState("");

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
              Candidate Address:
              <br />
              <input
                className="py-2 px-2 border border-gray-900 bg-gray-400 placeholder-gray-500 rounded-lg w-full mb-2 focus:ring-0 appearance-none"
                type="text"
                placeholder="Enter Candidate Age"
                onChange={(e) => setCanAddress(e.target.value)}
              />
            </label>

            <div className=" flex justify-center items-center">
              <button
                className="py-2 outline-none my-4 w-full hover:bg-[#d18d8c] bg-[#cf716e] text-white font-semibold rounded-lg"
                type="submit"
              >
                Remove Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RemoveCandidateModal;
