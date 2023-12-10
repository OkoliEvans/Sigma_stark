"use client";
import AddCandidateModal from "./modals/AddCandidateModal";
import RemoveCandidateModal from "./modals/RemoveCandidateModal";
import StartVoteModal from "./modals/StartVoteModal";

import Image from "next/image";
import React, { useState } from "react";

const CreatorProfile = () => {
  const [isAddCandidateModalOpen, setAddCandidateModalOpen] = useState(false);
  const [isRemoveCandidateModalOpen, setRemoveCandidateModalOpen] =
    useState(false);
  const [isStartVoteModalOpen, setStartVoteModalOpen] = useState(false);

  const openAddCandidateModal = () => {
    setAddCandidateModalOpen(true);
  };

  const closeAddCandidateModal = () => {
    setAddCandidateModalOpen(false);
  };

  const openRemoveCandidateModal = () => {
    setRemoveCandidateModalOpen(true);
  };

  const closeRemoveCandidateModal = () => {
    setRemoveCandidateModalOpen(false);
  };

  const openStartVoteModal = () => {
    setStartVoteModalOpen(true);
  };

  const closeStartVoteModal = () => {
    setStartVoteModalOpen(false);
  };

  return (
    <div className="flex bg-[#f7ebeb] sm:px-16 px-6 justify-center items-start">
      <div className="xl:max-w-[1280px] w-full">
        <div className=" w-full shadow-lg rounded-2xl relative flex-col justify-center items-center bg-[#e9e1da] py-12 md:px-16 px-4 mb-12">
          <div className="flex flex-row justify-center items-center w-[100%]">
            <div className=" flex flex-col w-[50%]">
              <div className=" bg-[#f7ebeb] h-[150px] w-[150px] flex justify-center items-center rounded-full p-2">
                <Image
                  src="/thelect.png"
                  width={150}
                  height={150}
                  alt="avatar"
                />
              </div>
              <div className=" flex flex-row gap-4">
                <div className=" flex flex-col gap-4">
                  <button
                    onClick={openAddCandidateModal}
                    className="py-2 px-4 outline-none mt-4 w-full hover:bg-[#b2605e] bg-[#cf716e] text-gray-600 text-sm font-normal rounded-lg"
                  >
                    Add Candidate
                  </button>
                  <button
                    onClick={openRemoveCandidateModal}
                    className="py-2 px-4 outline-none mt-4 w-full hover:bg-[#b2605e] bg-[#cf716e] text-gray-600 text-sm font-normal rounded-lg"
                  >
                    Remove Candidate
                  </button>
                </div>

                <div className=" flex flex-col gap-4">
                  <button
                    onClick={openStartVoteModal}
                    className="py-2 px-4 outline-none mt-4 w-full hover:bg-[#b2605e] bg-[#cf716e] text-gray-600 text-sm font-normal rounded-lg"
                  >
                    Start Vote
                  </button>
                  <button className="py-2 px-4 outline-none mt-4 w-full hover:bg-[#b2605e] bg-[#cf716e] text-gray-600 text-sm font-normal rounded-lg">
                    End Vote
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <p className=" text-lg font-bold text-gray-700">
                <span className=" text-xs font-normal text-[#b2605e]">
                  Contest:
                </span>{" "}
                Babalola
              </p>
              <p className=" text-lg font-bold text-gray-700">
                <span className=" text-xs font-normal text-[#b2605e]">
                  Overseer:
                </span>{" "}
                G.O
              </p>
              <div className=" flex flex-row gap-8">
                <p className=" text-lg font-bold text-gray-700">
                  <span className=" text-xs font-normal text-[#b2605e]">
                    Election ID:{" "}
                  </span>{" "}
                  234
                </p>
                <p className=" text-lg font-bold text-gray-700">
                  <span className=" text-xs font-normal text-[#b2605e]">
                    Election Status:
                  </span>{" "}
                  Started
                </p>
              </div>
              <p className=" text-lg font-bold text-gray-700">
                <span className=" text-xs font-normal text-[#b2605e]">
                  End Time
                </span>
                : 10
              </p>
              <p className=" text-lg font-bold text-gray-700">
                <span className=" text-xs font-normal text-[#b2605e]">
                  Total Candidates:
                </span>{" "}
                67
              </p>
              <div className=" flex flex-row gap-8">
                <p className=" text-lg font-bold text-gray-700">
                  <span className=" text-xs font-normal text-[#b2605e]">
                    Total Votes:
                  </span>{" "}
                  78999
                </p>
                <p className=" text-lg font-bold text-gray-700">
                  <span className=" text-xs font-normal text-[#b2605e]">
                    Winner:
                  </span>{" "}
                  Segun Sege
                </p>
              </div>
            </div>
          </div>
          {isAddCandidateModalOpen && (
            <AddCandidateModal onClose={closeAddCandidateModal} />
          )}
          {isRemoveCandidateModalOpen && (
            <RemoveCandidateModal onClose={closeRemoveCandidateModal} />
          )}
          {isStartVoteModalOpen && (
            <StartVoteModal onClose={closeStartVoteModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
