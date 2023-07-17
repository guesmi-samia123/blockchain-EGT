import { TransactionContext } from "../context/TransactionContext.jsx";
import { IoWarning } from "react-icons/io5";
import React, { useEffect, useContext, useState } from "react";
import MyModel from "./Model2.jsx";
import { PopupBtween}  from "./popupBtween.jsx";
import Axios from "axios";
import {
  contractPurchaseN1_ABI,
  contractPurchaseN1_Adress,
} from "../utils/constants";

const BackButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center text-blue-500 hover:underline font-bold"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.707 4.293a1 1 0 010 1.414L8.414 10l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Retour
    </button>
  );
};

const Link = ({ url, text }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline font-bold  text-center"
    >
      {text}
    </a>
  );
};

function Popup1(props) {
  return (
    <div className=" mt-8 ml-[-20px]">
      <div className="mt-4">
        <p className="bg-[#ffe9d9] p-2 border-l-2 border-[#fa703f] text-[#bc4c2e] flex flex-col text-sm my-1">
          <span className="text-[#771505] font-bold flex item-center gap-1">
            <IoWarning />
            Warning
          </span>
          Balance Supplier not sufficient !
        </p>
      </div>
      <p className="text-gray-700">
        <span className="font-bold">Address From: </span> {props.param1}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Address To: </span> {props.param6}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Balance Of Ether: </span> {props.param4}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Amount Energy Demanded: </span>{" "}
        {props.param7} Kilowatt equal to {props.param2} Token
      </p>
      <p className="text-gray-700">
        <span className="font-bold">
          Balance of EnergyToken for the Supplier ! 
        </span>{" "}
        {props.param5}
      </p>
      <br />
      <p className="text-gray-700">
        <span className="font-bold">Price: </span> {props.param3} Ether
      </p>
      <div className="flex justify-between mt-8">
        <div className="ml-[-50px]"></div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={props.param8}
        >
          OK
        </button>
      </div>
    </div>
  );
}
export { Popup1 };

export const Popup2 = (props) => {
  return (
    <div className=" mt-8 ml-[-20px]">
      <div className="mt-4">
        <p className="bg-[#ffe9d9] p-2 border-l-2 border-[#fa703f] text-[#bc4c2e] flex flex-col text-sm my-1">
          <span className="text-[#771505] font-bold flex item-center gap-1">
            <IoWarning />
            Warning
          </span>
          Your balance is not sufficient. Please recharge your account
        </p>
      </div>
      <p className="text-gray-700">
        <span className="font-bold">Address From: </span> {props.param1}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Address To: </span> {props.param6}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Balance Of Ether: </span> {props.param4}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Amount Energy Demanded: </span>{" "}
        {props.param7} Kilowatt equal to {props.param2} Token
      </p>
      <p className="text-gray-700">
        <span className="font-bold">
          Balance of EnergyToken for the Supplier: 
        </span>{" "}
        {props.param5}
      </p>
      <br />
      <p className="text-gray-700">
        <span className="font-bold">Price: </span> {props.param3} Ether
      </p>
      <div className="flex justify-between mt-8">
        <div className="ml-[-50px]">
          <Link url="https://sepoliafaucet.com/" text="Charge Ether" />
        </div>
        <BackButton onClick={props.param8} />
      </div>
    </div>
  );
};

function Popup3(props) {
  const {
    currentAccount,
    formData,
    transactionEthHash,
    addTransactionDB2,
    handleUpdate,
  } = useContext(TransactionContext);
  //console.log(transactionEthHash)

  const addTransactionDB = () => {
    const { addressTo, amount, amount_Energy, time_waiting, message } =
      formData;

    Axios.post("http://localhost:3001/create", {
      adressFrom: currentAccount,
      adress_To: addressTo,
      hash: transactionEthHash,
      Time_waiting: parseInt(time_waiting),
      amount_Ether: parseFloat(amount),
      amount_energyToken: parseFloat(amount_Energy),
      DateTime: new Date().toLocaleString(),
    }).then(() => {
      console.log("succes DB add");
    });
  };
  //console.log(transactionEthHash);
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);
  const { sendEtherByDf } = useContext(TransactionContext);

  const handleSubmit = async (e) => {
    await sendEtherByDf();
    //await  addTransactionDB()
    setShowMyModel(true);
  };
  return (
    <div>
      <div className=" mt-8 ml-[-20px]">
        <p className="text-gray-700">
          <span className="font-bold">Address From: </span> {props.param1}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Address To: </span> {props.param6}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Balance Of Ether: </span> {props.param4}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Amount Energy Demanded: </span>{" "}
          {props.param7} Kilowatt equal to {props.param2} Token
        </p>
        <p className="text-gray-700">
          <span className="font-bold">
            Balance of EnergyToken for the Supplier:
          </span>{" "}
          {props.param5}
        </p>
        <br />
        <p className="text-gray-700">
          <span className="font-bold">Price: </span> {props.param3} Ether
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <div className="ml-[-50px]">
          <button
            className="outline outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black"
            onClick={props.param8}
          >
            No, Cancel
          </button>
        </div>
        <button
          className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 hover:bg-transparent ml-2"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
      <MyModel
        onClose1={handleOnClose}
        visible={showMyModel}
        onclose2={props.param8}
      />
    </div>
  );
}
export { Popup3 };

export const Popup5 = (props) => {
  const {
    currentAccount,
    handleUpdate,
    transactionEthHash,
    TransferTokenEnegy,
    getEthereumContract,
    deployContract,
  } = useContext(TransactionContext);
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);

  const handleSubmit = async (e) => {
    //update the status of transaction to be accepted
    const hashValue = transactionEthHash;
    const newEtatValue = "accepted";
    handleUpdate(hashValue, newEtatValue);
    // transfer energy token
    await TransferTokenEnegy(props.param1.toString());
    //create smart contract purchase
    //await deployContract();
    setShowMyModel(true);
    
  };
  return (
    <div className=" mt-8 ml-[-20px]">
      <h1>Block Token</h1>

      <p className="text-gray-700">
        <span className="font-bold">We will block</span> {props.param1} from
        your account . Please confirm if you are agree with that
      </p>
      <br />
      <div className="flex justify-between mt-8">
        <div className="ml-[-50px]">
          <button
            className="outline outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black"
            onClick={props.param3}
          >
            No, Cancel
          </button>
        </div>
        <button
          className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 hover:bg-transparent ml-2"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
      <PopupBtween onClose={handleOnClose} visible={showMyModel} closemepopup5={props.param3} />
    </div>
  );
};

const Popup4 = (props) => {
  const handleSubmit = () => {};
  return (
    <div className="mt-8 ml-[-20px]">
      <h1>Block Token</h1>
      <div className="mt-4">
        <p className="bg-[#ffe9d9] p-2 border-l-2 border-[#fa703f] text-[#bc4c2e] flex flex-col text-sm my-1">
          <span className="text-[#771505] font-bold flex item-center gap-1">
            <IoWarning />
            your balance not sufficient
          </span>
        </p>
      </div>
      <p className="text-gray-700">
        <span className="font-bold">this transaction need </span> {props.param1}{" "}
        and your balance equal to {props.param2}
      </p>
      <br />
      <div className="flex justify-between mt-8">
        <div className="ml-[-50px]">
          <button
            className="outline outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black"
            onClick={props.param3}
          >
            No, Cancel
          </button>
        </div>
        <button
          className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-black py-2 px-4 hover:bg-transparent ml-2"
          onClick={handleGoToDashboard}
        >
          Go to Dashboard Page
        </button>
      </div>
    </div>
  );
};

export { Popup4 };
