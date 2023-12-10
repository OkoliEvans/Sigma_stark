"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Contract,
  Provider,
  RpcProvider,
  constants,
  validateAndParseAddress,
} from "starknet";
import childABI from "../../../../utils/ABI/childABI.json";
import factoryABI from "../../../../utils/ABI/factoryABI.json";
import CreatorProfile from "../../../components/CreatorProfile";
import Voters from "../../../components/Voters";
import { useWallet } from "@/context/WalletContext";
import { FactoryAddress } from "../../../../utils/contractAddress";

const UserOrVoter = () => {
  const [overseer, setOverseer] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const { address } = useWallet();
  const params = useParams();

  useEffect(() => {
    const getElectionsOverseer = async () => {
      const provider = new RpcProvider({
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/" + apiKey,
      });

      try {
        const contract = new Contract(factoryABI, FactoryAddress(), provider);
        const electionsId = await contract.return_election_id(params.slug);

        const electionsDetails = await contract.return_contest(
          electionsId.toString()
        );
        console.log("details", electionsDetails);

        setOverseer(validateAndParseAddress(electionsDetails.overseer));
      } catch (error) {
        console.log(error.message);
      }
    };

    getElectionsOverseer();
  }, [overseer, apiKey, params.slug]);

  console.log("address", address);
  console.log("overseer", overseer);
  console.log("params", params.slug);
  return <div>{address == overseer ? <CreatorProfile /> : <Voters />}</div>;
};

export default UserOrVoter;
