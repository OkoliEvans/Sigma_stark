import React from "react";
import Image from "next/image";

const Features = () => (
  <section className="flex-1 flex flex-col sm:flex-row-reverse justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
    <div className="flex-1 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
      <Image
        src="/voting_hand.png"
        alt="hero_section"
        width={530}
        height={630}
      />
    </div>

    <div className="md:ml-5 flex-1 flex justify-center items-start flex-col">
      <h2 className="font-rubik font-semibold xs:text-[48px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full">
        Features?
        <hr className=" border-t-2 m-0 border-black w-2/4 " />
      </h2>

      <div className="font-rubik font-normal text-[#000] text-[18px] leading-[30.8px]max-w-[470px] mt-5">
        <ul className="max-w-md space-y-1 text-black list-inside ">
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-[#561a18] flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Easy to use
          </li>
          <li className="flex items-center">
            <svg
              class="w-3.5 h-3.5 me-2 text-[#561a18] flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Cheaper than ballot voting system
          </li>
          <li class="flex items-center">
            <svg
              class="w-3.5 h-3.5 me-2 text-[#561a18] flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Faster voting process
          </li>
          <li className="flex items-center">
            <svg
              class="w-3.5 h-3.5 me-2 text-[#561a18] flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Backed by Starknet based technology
          </li>
          <li class="flex items-center">
            <svg
              class="w-3.5 h-3.5 me-2 text-[#561a18] flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Verifiable transaction
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default Features;
