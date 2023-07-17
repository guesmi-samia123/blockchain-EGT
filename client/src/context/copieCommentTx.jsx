import React, { useEffect, useState } from "react";
import {ethers} from "ethers";

import { ContractABI, contractAdress } from "../utils/constants";
//*** acces to the blockchain  */
//react context api => to cennecting to the blockchian
export const TransactionContext = React.createContext();

//create ethereum object represents user's current Ethereum provider ( MetaMask)
const { ethereum } = window;

//fetch ethereum contract
const getEthereumContract = () => {
  //create new instance of the web3Provider class using the ethereum object as a provider
  //web3Provider : provides a way to interact with the Ethereum network using the Web3 API
  //this providers is connected to metamask
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAdress,
    ContractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};
//create a contexte where we call the previous code

export const TransactionsProvider = ({ children }) => {
  return (
    <TransacionContext.Provider value={{ value : "test" }}>
       { children }
    </TransacionContext.Provider>
  );
}
