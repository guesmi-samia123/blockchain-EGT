import React, { useEffect, useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";
import { ethers } from "ethers";
import {CorrectSign,ErrorData} from "./popUpVerifSign.jsx";
import Modal from 'react-modal';
import axios from "axios";
import { ShowSmartContract } from "./showSmartContract.jsx";

const Transfinish3 = ({ visible, onClose, param1, param2 ,param3}) => {
    const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);
    const {
        transferEther1,
        transferEther2,
        contractTransport,
        hashtxfinish1,
        hashtxfinish2,hashtxfinish3, sethashtxfinish3
       
      } = useContext(TransactionContext);
  const handleSubmit = async  () => {
const transaction = await transferEther1('0.00008',param2);
sethashtxfinish3(transaction.hash)
setShowMyModel(true)

  };
  if (!visible) return null;
  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex  justify justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md text-left  ">
    <div className="mt-8 ml-[-20px]">
      
      <div className="mt-4">
        
      </div>
      <p className="text-gray-700">
        <span className="font-bold">Smart contract Complete  </span> {}
        
      </p>
      <br />
      <div className="flex justify-between mt-8">
        <div className="ml-[-50px]">
         
        </div>
        <button
          className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-black py-2 px-4 hover:bg-transparent ml-2"
          onClick={handleSubmit}
          
        >
          See smart contract
        </button>
      </div>
    </div>
    </div>
    <ShowSmartContract
        onClose={handleOnClose}
        visible={showMyModel}
        param2={param3}
        param1={onClose}
      />
    </div>
  );
};

export { Transfinish3 };
