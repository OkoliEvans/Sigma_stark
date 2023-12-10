import React from "react";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex md:flex-row flex-col sm:py-16 py-6 sm-px-16 px-6 gap-16">
      <div className="flex flex-1 items-start justify-center flex-col xl:px-0 sm:px-16 px-6">
        <h1 className="font-rubik font-semibold sm:text-[50px] text-[42px] text-[#000] sm:leading-[75px] leading-[55px] w-full">
          Exercise Your Right, Cast Your Vote Today.
        </h1>
        <p className="font-poppins font-normal text-[#666666] text-xl leading-[30.8px] max-w-[470px] mt-5">
          Join the democratic process, influence decisions, and shape the future
          by participating in the vital act of voting today. Be heard!
        </p>
        <div className="flex mt-4 gap-4">
          <div className="bg-[#cf716e] text-white flex items-center justify-center rounded-lg w-36 h-12 p-4 shadow-lg cursor-pointer">
            <Link href="get-started">Get started</Link>
          </div>
          {/* <div className="bg-[#FFFFFF] hover:bg-[#212529] border hover:border-none border-[#000] text-[#000] flex items-center justify-center rounded-lg w-40 h-12 p-4 shadow-lg cursor-pointer hover:text-[#FFFFFF]">
            <Link href="create">Create election</Link>
          </div> */}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center md:my-0 my-10 relative">
        <Image
          src="/voting_banner.png"
          alt="hero_section"
          width={530}
          height={630}
        />
      </div>
    </section>
  );
};

export default Hero;
