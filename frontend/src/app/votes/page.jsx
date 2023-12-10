"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Contract, Provider, RpcProvider, constants } from "starknet";
import { FactoryAddress } from "../../../utils/contractAddress";
import factoryABI from "../../../utils/ABI/factoryABI.json";
import { validateAndParseAddress } from "starknet";
import hexToReadableText from "../../../utils/toText";
import Link from "next/link";

const ElectionList = ({ electionAddress }) => {
  //const [retrievedElectionsId, setRetrievedElectionsId] = useState("");
  const [retrievedElectionsDetails, setRetrievedElectionsDetails] =
    useState("");
  const [overseer, setOverseer] = useState("");
  const [contest, setContest] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const route = useRouter();
  const handleRoute = () => {
    route.push("/votes/firstVote");
  };

  useEffect(() => {
    const getElectionsId = async () => {
      const provider = new RpcProvider({
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/" + apiKey,
      });

      try {
        const contract = new Contract(factoryABI, FactoryAddress(), provider);
        const electionsId = await contract.return_election_id(electionAddress);
        const electionsDetails = await contract.return_contest(
          electionsId.toString()
        );
        console.log("electionsId", electionsId);
        console.log("electionDetails", electionsDetails);
        setRetrievedElectionsDetails(electionsDetails);
        setContest(hexToReadableText(electionsDetails.contest.toString(16)));
        setOverseer(validateAndParseAddress(electionsDetails.overseer));
      } catch (error) {
        console.log(error.message);
      }
    };

    getElectionsId();
  }, []);

  console.log("retrievedDetails", retrievedElectionsDetails);
  console.log("overseer", overseer);
  console.log("contest", contest);

  //console.log("retrievedId", retrievedElectionsId);

  return (
    <div>
      <div className="bg-gray-200 shadow-md p-2 rounded-md mb-4 w-full flex flex-col items-center justify-center cursor-pointer">
        <Link href={`/votes/${electionAddress}`}>
          <h3 className="text-lg text-center mt-2 font-medium mb-2 w-full">
            Election: {contest}
          </h3>
          <p className="text-gray-700 text-sm w-full">Overseer: {overseer}</p>
        </Link>
      </div>
    </div>
  );
};

const Votes = () => {
  const [retrievedElections, setRetrievedElections] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getElections = async () => {
      const provider = new RpcProvider({
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/" + apiKey,
      });

      try {
        const contract = new Contract(factoryABI, FactoryAddress(), provider);
        const elections = await contract.return_elections();
        console.log("elections", elections);
        setRetrievedElections(elections);
      } catch (error) {
        console.log(error.message);
      }
    };

    getElections();
  }, []);

  console.log("retrieved", retrievedElections);

  return (
    <div className="flex bg-[#f7ebeb] sm:px-16 px-6 justify-center items-center">
      <div className=" flex items-center justify-center bg-[#e9e1da] py-12 md:px-16 px-4 mb-12 w-4/5 shadow-lg rounded-2xl relative">
        <div className="w-full flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center w-full mt-10">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Elections</h2>
            {retrievedElections &&
              retrievedElections.map((election, index) => {
                return (
                  <div key={index}>
                    <ElectionList electionAddress={election} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
