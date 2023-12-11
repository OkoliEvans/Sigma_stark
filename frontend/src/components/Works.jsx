import React from "react";
import Image from "next/image";

const Works = () => (
  <section className="flex-1 flex flex-col sm:flex-row justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
    <div className="flex-1 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
      <Image
        src="/multiple_handb.png"
        alt="hero_section"
        width={530}
        height={630}
      />
    </div>

    <div className="md:ml-5 flex-1 flex justify-center items-start flex-col">
      <h2 className="font-rubik font-semibold xs:text-[48px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full">
        How Does <br className="sm:block hidden" /> It Work?
      </h2>
      <p className="font-rubik font-normal text-[#000] text-[18px] leading-[30.8px]max-w-[470px] mt-5">
        An online voting system that will replace the old ballot system or paper
        system. Over the time we have utulized the required technology in every
        sector to improve efficiency and save the extra resources. But the
        voting system is still very expensive and requires a bigger workforce.
        The system is slower and still not completely tamper proof.
      </p>

      <p className="font-poppins font-normal text-[#000] text-[18px] leading-[30.8px] max-w-[470px] mt-5">
        We bring the system that is safe, reliable and solve the modern issues
        like higher reachability of the booth, crowd free voting, inexpensive,
        faster results and others.
      </p>
    </div>
  </section>
);

export default Works;
