"use client";
import React, { useState } from "react";

const GetStarted = () => {
  const [generatedNumber, setGeneratedNumber] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const generateRandomNumber = () => {
    let newNumber;

    do {
      newNumber = Math.floor(Math.random() * 1000) + 1; // Adjust the range as needed
    } while (generatedNumbers.includes(newNumber));

    setGeneratedNumber(newNumber);
    setGeneratedNumbers((prevNumbers) => [...prevNumbers, newNumber]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={generateRandomNumber}
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
      >
        Generate Election ID
      </button>
      {generatedNumber && isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="mb-4">
              Generated Election ID: <strong>{generatedNumber}</strong>
            </p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
