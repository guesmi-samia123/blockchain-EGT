import { IoWarning } from "react-icons/io5";
import { TransactionContext } from "../context/TransactionContext.jsx";
import React, { useEffect, useContext, useState } from "react";
import { ShortenAddress } from "../utils/shortenAdress.js";
import { Popup1, Popup2, Popup3 } from "./popUP.jsx";


export default function MyModel({ visible, onClose }) {
  const {
    currentAccount,
    EnergyTokenAmount,
    EtherEneryRequested,
    BalanceCurrentAccount,
    BalanceAdressTo,
    formData,
  } = useContext(TransactionContext);

  const { addressTo, amount, amount_Energy, time_waiting, message } = formData;

  if (!visible) return null;
  
  let popupComponent = null;

  if (
    parseFloat(EtherEneryRequested) > parseFloat(BalanceCurrentAccount) ){
      console.log(EtherEneryRequested)
    popupComponent = <Popup2 param1={currentAccount} param2={EnergyTokenAmount} param3={EtherEneryRequested} param4={BalanceCurrentAccount} param5={BalanceAdressTo} param6={addressTo} param7={amount_Energy} param8={onClose}/>;
  } else if (parseFloat(EnergyTokenAmount) > parseFloat(BalanceAdressTo)) {
    popupComponent = <Popup1 param1={currentAccount} param2={EnergyTokenAmount} param3={EtherEneryRequested} param4={BalanceCurrentAccount} param5={BalanceAdressTo} param6={addressTo} param7={amount_Energy} param8={onClose} />;
  } else {
    popupComponent = <Popup3 param1={currentAccount} param2={EnergyTokenAmount} param3={EtherEneryRequested} param4={BalanceCurrentAccount} param5={BalanceAdressTo} param6={addressTo} param7={amount_Energy} param8={onClose}/>;
  }
  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex  justify justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md text-left  ">
      <h1 className="font-bold  text-center text-lg my-1 mt-[-60px] mb-4"> Transaction Details </h1>
      {popupComponent}
     </div>
    </div>
  );
}
