"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaWallet } from "react-icons/fa";
import { GiClosedBarbute } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { useWallet } from "../context/WalletContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  let Anchors = [
    { name: "Home", address: "/" },
    { name: "Votes", address: "/votes" },
    { name: "About", address: "/about" },
    { name: "Docs", address: "/docs" },
  ];

  const { connection, address, connectWallet, account, disconnectWallet } =
    useWallet();

  const router = useRouter();
  const pathname = usePathname();

  let [open, setOpen] = useState(false);
  let [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full bg-[#FFFFFF] fixed top-0 left-0 z-30 p-4">
      <div className="md:flex items-center justify-between text-[#010101] text-sm font-medium">
        <Link href="/">
          <h2 className="text-[#561a18] text-2xl font-mono font-bold font">
            SigmaStark.
          </h2>
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <MdOutlineClose /> : <HiMenuAlt3 />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[100] right-4  w-[70%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            open ? "top-20 bg-[#FFFFFF] rounded-2xl shadow-lg" : "top-[-490px]"
          }`}
        >
          {Anchors.map((anchor) => (
            <li
              key={anchor.name}
              className="lg:ml-[32px] md:ml-[2px] text-base md:my-0 my-7 mb-[10px]"
            >
              <Link
                href={anchor.address}
                className={`  border border-transparent ${
                  pathname == anchor.address
                    ? "text-[#010101] rounded-2xl px-[24px] py-[8px]"
                    : ""
                } hover:border hover:text-[#F5F6FF] hover:bg-[#cf716e] rounded-2xl px-[24px] py-[8px] duration-500 ease-in-out`}
              >
                {anchor.name}
              </Link>
            </li>
          ))}

          <div className="md:ml-6 md:my-0 my-7 mb-[10px]">
            {connection ? (
              <button
                onClick={() => setOpenModal(true)}
                className="justify-center gap-2 bg-[#cf716e] py-2 px-2 rounded-xl shadow-md font-medium text-sm text-center inline-flex items-center hover:bg-[#b2605e] focus:ring-2 focus:ring-gray-500"
              >
                <IconContext.Provider
                  value={{ color: "black", size: "1.5rem" }}
                >
                  <GiClosedBarbute />
                </IconContext.Provider>
                {address.slice(0, 6)}...{address.slice(-4)}
                <MdOutlineArrowDropDown />
              </button>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="justify-center gap-2 bg-[#cf716e] py-2.5 px-5 rounded-xl shadow-md font-medium text-sm text-center inline-flex items-center hover:bg-[#b2605e] focus:ring-2 focus:ring-gray-500"
              >
                <FaWallet />
                Connect
              </button>
            )}
          </div>
        </ul>
        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="z-10 bg-[#000] p-2 rounded-xl shadow-lg text-white flex flex-col text-2xl w-[15%]">
              <div
                onClick={() => setOpenModal(false)}
                className="text-2xl mb-2 cursor-pointer ml-auto"
              >
                <IoCloseCircle />
              </div>
              <div className=" flex flex-col justify-center items-center">
                <div className=" bg-[#cf716e] rounded-full p-4 flex items-center justify-center">
                  <GiClosedBarbute />
                </div>
                <div className=" text-base mt-1">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </div>
                <button
                  className=" text-center bg-[#1d1d1d] p-2 rounded-xl text-base mt-2 w-3/4"
                  onClick={() => disconnectWallet() && setOpenModal(false)}
                >
                  <div className=" flex items-center justify-center">
                    <IoExit />
                  </div>
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
