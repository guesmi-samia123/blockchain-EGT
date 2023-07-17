import { TransactionContext } from "../context/TransactionContext.jsx";
import React, { useEffect, useContext, useState } from "react";
import { Popup4, Popup5 } from "./popUP.jsx";

export default function ModelAcceptance({ visible, onClose }) {
  const { currentAccount, balanceOfToken, EGT_PENDING, setEGT_PENDING } =
    useContext(TransactionContext);

  if (!visible) return null;
  let popupComponent = null;
  if (parseFloat(EGT_PENDING) > parseFloat(balanceOfToken)) {
    popupComponent = <Popup5 param1={EGT_PENDING} param2={balanceOfToken} param3={onClose} />;

  } else {
    popupComponent = <Popup5 param1={EGT_PENDING} param2={balanceOfToken} param3={onClose}/>;
    
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex  justify justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md text-left  ">
        <h1 className="font-bold  text-center text-lg my-1 mt-[-60px] mb-4">
        </h1>
        {popupComponent}
      </div>
    </div>
  );
}
