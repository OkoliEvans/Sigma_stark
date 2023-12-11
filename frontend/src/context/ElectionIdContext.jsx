"use client";

import { createContext, useContext, useState } from "react";

const ElectionIdContext = createContext();

export const ElectionIdProvider = ({ children }) => {
  const [generatedNumber, setGeneratedNumber] = useState(null);

  const setNumber = (number) => {
    setGeneratedNumber(number);
  };

  return (
    <ElectionIdContext.Provider value={{ generatedNumber, setNumber }}>
      {children}
    </ElectionIdContext.Provider>
  );
};

export const useElectionId = () => {
  const context = useContext(ElectionIdContext);
  if (!context) {
    throw new Error("useElectionId must be used within an ElectionIdProvider");
  }
  return context;
};
