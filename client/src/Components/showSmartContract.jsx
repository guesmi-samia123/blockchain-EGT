import React, { useEffect, useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";
import { ethers } from "ethers";
import { CorrectSign, ErrorData } from "./popUpVerifSign.jsx";
import Modal from "react-modal";
import axios from "axios";

const ShowSmartContract = ({ visible, onClose, param1, param2 }) => {
  const { contractTransport, hashtxfinish2, hashtxfinish1, hashtxfinish3 } =
    useContext(TransactionContext);
  const handleUpdate = () => {
    axios
      .put("http://localhost:3002/UpdateDBrecuFromSeller", {
        contractTransport,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    handleUpdate();
    onClose();
    param1();
    param2();
  };
  if (!visible) return null;
  return (
    <div className="fixed top-0 right-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-20 rounded-md shadow-md text-left">
        <h2 className="text-2xl font-bold mb-4">Smart Contract </h2>
        <h3 className="text-2xl font-bold mb-4">
          {" "}
          {contractTransport.adress_contract}{" "}
        </h3>

        <div className="ml-[-20px] mt-8">
          <div className="mt-4"></div>
          <p className="text-gray-700">
            <span className="font-bold">
              Transaction: EXCHANGE ETHER PRICE TO SELLER
            </span>{" "}
            {hashtxfinish1}
          </p>
          <br></br>
          <p className="text-gray-700">
            <span className="font-bold">
              Transaction: EXCHANGE TOKEN AMOUNT TO BUYER
            </span>{" "}
            {hashtxfinish2}
          </p>
          <br></br>
          <p className="text-gray-700">
            <span className="font-bold">
              Transaction: EXCHANGE ETHER PRICE TO CARRIER
            </span>{" "}
            {hashtxfinish3}
          </p>
          <br />
          <div className="flex justify-between mt-8">
            <div className="ml-[-50px]"></div>
            <button
              className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-black py-2 px-4 hover:bg-transparent ml-2"
              onClick={handleSubmit}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ShowSmartContract };
