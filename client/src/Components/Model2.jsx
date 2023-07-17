import { TransactionContext } from "../context/TransactionContext.jsx";
import React, { useEffect, useContext, useState } from "react";


export default function MyModel({ visible, onClose1,onclose2 }) {
    const {EtherEneryRequested,formData,transactionEthHash} = useContext(TransactionContext);
      const { addressTo, amount, amount_Energy, time_waiting, message } =formData;

      const handleSubmit = async  (e) => { 
        onClose1();
        onclose2();
      }

    if (!visible) return null;
    let popupComponent = null;
    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex  justify justify-center items-center">
          <div className="bg-white p-20 rounded-md shadow-md text-left  ">
          <h1 className="font-bold  text-center text-lg my-1 mt-[-60px] mb-4">
          Ether sent successfully
          </h1>
          <p className="text-gray-700">
      {EtherEneryRequested}<span className="font-bold">  Sended to '0xb361aDEcc082167e102cF0004667e99BC406c370' </span>
      </p>
      <p className="text-gray-700">
      {EtherEneryRequested}<span className="font-bold">   will be blocked from your wallet for ' </span>{" "}
      {time_waiting} Hour
      </p>
      <p className="text-gray-700">
      <span className="font-bold">Transaction Hash : </span>{" "}
      {transactionEthHash}
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        OK
      </button>
         </div>
        </div>
      );
  }
  export {MyModel}  ;