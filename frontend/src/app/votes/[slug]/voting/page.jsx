"use client";

import React, { useState } from "react";
import { BsPersonLinesFill } from "react-icons/bs";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IconContext } from "react-icons";
//import VerifyId from "../../../components/modals/VerifyId";

const Accordion = ({ items, selectedOption, onOptionChange }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className=" mb-2 flex flex-col items-center justify-center"
        >
          <div
            className={`border flex items-center justify-between p-2 cursor-pointer ${
              openIndex === index ? "bg-gray-300 " : "bg-gray-100"
            }`}
            onClick={() => handleToggle(index)}
          >
            <label className="flex items-center justify-center space-y-4">
              <input
                type="radio"
                name="accordionOption"
                value={item.header}
                checked={selectedOption === item.header}
                onChange={() => onOptionChange(item.header)}
                className="mr-4 text-[#cf716e] bg-gray-100 checked:bg-[#cf716e] border border-[#cf716e] checked:border-[#cf716e] h-4 w-4 rounded-full checked:ring-2 checked:ring-[#cf716e] focus:ring-[#cf716e]"
              />
              <div className="">{item.header}</div>
            </label>
            <span>
              {openIndex === index ? (
                <IconContext.Provider
                  value={{ color: "black", size: "1.5rem" }}
                >
                  <IoMdArrowDroprightCircle />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider
                  value={{ color: "black", size: "1.5rem" }}
                >
                  <IoMdArrowDropdownCircle />
                </IconContext.Provider>
              )}
            </span>
          </div>
          {openIndex === index && (
            <div className="p-2 bg-gray-200 w-[95%] flex flex-col justify-start items-start">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Voting = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [isVerifyIdModalOPen, setIsVerifyIdModalOPen] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
    setIsVerifyIdModalOPen(true);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Selected Option:", selectedOption);
  };

  const closeVerifyIdModal = () => {
    setIsVerifyIdModalOPen(false);
  };

  const accordionItems = [
    {
      header: (
        <div className="grid grid-cols-3 gap-80 mb-4">
          <div>Baburao</div>
          <div>President</div>
          <div>
            <IconContext.Provider value={{ color: "black", size: "1.5rem" }}>
              <BsPersonLinesFill />
            </IconContext.Provider>
          </div>
        </div>
      ),
      content: (
        <div className=" flex flex-col justify-start items-start">
          <div>
            <strong>Name:</strong> John Doe
          </div>
          <div>
            <strong>Adress:</strong> John Doe
          </div>
          <div>
            <strong>Age:</strong> 30
          </div>
          <div>
            <strong>Position:</strong> President
          </div>
          <div>
            <strong>Description:</strong> Bachelor's in Computer Science
          </div>
        </div>
      ),
    },
    {
      header: (
        <div className="grid grid-cols-3 gap-80 mb-4">
          <div>Baburao</div>
          <div>President</div>
          <div>
            <IconContext.Provider value={{ color: "black", size: "1.5rem" }}>
              <BsPersonLinesFill />
            </IconContext.Provider>
          </div>
        </div>
      ),
      content: (
        <div className=" flex flex-col justify-start items-start">
          <div>
            <strong>Name:</strong> John Doe
          </div>
          <div>
            <strong>Adress:</strong> John Doe
          </div>
          <div>
            <strong>Age:</strong> 30
          </div>
          <div>
            <strong>Position:</strong> President
          </div>
          <div>
            <strong>Description:</strong> Bachelor's in Computer Science
          </div>
        </div>
      ),
    },
    {
      header: (
        <div className="grid grid-cols-3 gap-80 mb-4">
          <div>Baburao</div>
          <div>President</div>
          <div>
            <IconContext.Provider value={{ color: "black", size: "1.5rem" }}>
              <BsPersonLinesFill />
            </IconContext.Provider>
          </div>
        </div>
      ),
      content: (
        <div className=" flex flex-col justify-start items-start">
          <div>
            <strong>Name:</strong> John Doe
          </div>
          <div>
            <strong>Adress:</strong> John Doe
          </div>
          <div>
            <strong>Age:</strong> 30
          </div>
          <div>
            <strong>Position:</strong> President
          </div>
          <div>
            <strong>Description:</strong> Bachelor's in Computer Science
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex bg-[#f7ebeb] sm:px-16 px-6 justify-center items-center">
      <div className=" flex items-center justify-center bg-[#e9e1da] py-12 md:px-16 px-4 mb-12 w-4/5 shadow-lg rounded-2xl relative">
        <div className=" w-full">
          <h1 className=" text-lg font-medium mb-3">Vote Panel</h1>
          <form
            onSubmit={handleSubmit}
            className=" text-center flex flex-col justify-center items-center"
          >
            <Accordion
              items={accordionItems}
              selectedOption={selectedOption}
              onOptionChange={handleOptionChange}
            />
            <p></p>
            <label className=" w-full  ">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className=" mr-2 text-[#cf716e] bg-gray-100 checked:bg-[#cf716e] border border-[#cf716e] checked:border-[#cf716e] checked:ring-2 checked:ring-[#cf716e] focus:ring-[#cf716e]"
              />
              I have selected as my candidate for this election.
            </label>
            <button
              disabled={!isChecked}
              className={`py-2 outline-none mt-4 w-1/5 hover:bg-[#d18d8c] bg-[#cf716e] text-white font-semibold rounded-lg ${
                !isChecked && "cursor-not-allowed opacity-50"
              }`}
              type="submit"
            >
              Vote
            </button>
            {isVerifyIdModalOPen && <VerifyId onClose={closeVerifyIdModal} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Voting;
