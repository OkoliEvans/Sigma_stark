"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useElectionId } from "@/context/ElectionIdContext";

const GetStarted = () => {
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const { generatedNumber, setNumber } = useElectionId();

  const router = useRouter();

  const generateRandomNumber = () => {
    let newNumber;

    do {
      newNumber = Math.floor(Math.random() * 1000) + 1; // Adjust the range as needed
    } while (generatedNumbers.includes(newNumber));

    setGeneratedNumbers((prevNumbers) => [...prevNumbers, newNumber]);
    setNumber(newNumber);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    router.push("create");
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-[#e9e1da] w-4/5 rounded-lg mt-3 p-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Sigmastark Election Platform
        </h1>

        <div className="max-w-xl text-center mb-8">
          <p>
            Hello and welcome to Sigmastark – your go-to platform for efficient
            and secure elections and campaigns.
          </p>
          <p>
            At Sigmastark, we are dedicated to providing a seamless and
            trustworthy experience for your electoral needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full mb-8">
          <h2 className="text-2xl font-bold mb-4">Generate Your Election ID</h2>
          <p className="mb-4">
            To get started on your journey with Sigmastark, the first step is to
            generate your Election ID. Your Election ID serves as a unique
            identifier for your election or campaign.
          </p>
          <button
            onClick={generateRandomNumber}
            className="bg-[#cf716e] text-white py-2 px-4 rounded-lg hover:bg-[#b2605e] focus:ring-2 focus:ring-[#cf716e] focus:outline-none"
          >
            Generate Election ID
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4">
            Participate in Ongoing Elections
          </h2>
          <p className="mb-4">
            If you are not looking to create an election but want to actively
            participate, simply head to the Votes page. There, you can browse
            and join ongoing elections, making your voice heard in important
            decisions.
          </p>
          <Link
            href="votes"
            className="text-[#cf716e] hover:underline focus:outline-none"
          >
            Go to Votes Page
          </Link>
        </div>

        {generatedNumber && isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="z-10 bg-[#000] p-2 rounded-xl shadow-lg text-white flex flex-col text-2xl w-[30%]">
              <div
                onClick={() => setModalOpen(false)}
                className="text-2xl mb-2 cursor-pointer ml-auto"
              >
                <IoCloseCircle />
              </div>
              <div className=" flex flex-col justify-center items-center -mt-1">
                <div className=" text-lg font-medium">
                  Generated Election ID: <strong>{generatedNumber}</strong>
                </div>
                <button
                  className=" text-center bg-[#1d1d1d] p-2 rounded-xl text-base my-2 w-3/4"
                  onClick={closeModal}
                >
                  Create Election
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStarted;
