import { TransactionContext } from "../context/TransactionContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import {
  contractPurchaseN1_ABI,
  contractPurchaseN1_bytecode,
} from "../utils/constants";
import axios from "axios";
import {Model_SC_} from "./file.jsx";

function PopupBtween({ visible, onClose ,closemepopup5}) {
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);
  const {
    currentAccount,
    balanceOfToken,
    EGT_PENDING,
    setEGT_PENDING,
    getEthereumContract,
    transactionEthHash,
    transactiontokenHashSeller1,
    deployContract,
    adressContractPurchase,
  } = useContext(TransactionContext);
  const [deploymentData, setDeploymentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3002/readbyhash/${transactionEthHash}`
      );
      setDeploymentData(response.data);
    };

    fetchData();
  }, [transactionEthHash]);
  const createContractaInDB = async (_token,_seller,_buyer,_resvWallet,_timeWaiting,_hashTX1,_mtTX1,_hashTX2,_mtTX2,_etat,_date_crated,_adressContractPurchase) =>{
    try{await axios.post("http://localhost:3002/createContract", {
      token : _token ,
      seller : _seller,
      buyer : _buyer,
      resvWallet : _resvWallet,
      timeWaiting : _timeWaiting,
      hashTX1 : _hashTX1,
      mtTX1 :  _mtTX1,
      hashTX2 : _hashTX2,
      mtTX2 : _mtTX2,
      etat : _etat,
      date_crated : _date_crated,
      adress_contract : _adressContractPurchase
    }).then(() => {
      console.log("succes DB add");
    });
  } catch (error) {
    console.error(error);
  }

  }
  const update_SC_Data2 = async () => {
    const a = "in process";
    const b = new Date().toLocaleString();
     // Get deployment data from somewhere

    const updatedData = deploymentData.map((transaction) =>
      deployContract(
        currentAccount,
        transaction.adressFrom,
        "0xb361aDEcc082167e102cF0004667e99BC406c370",
        transaction.taimeWaiting,
        transaction.hash,
        transaction.amount_Ether.toString(),
        transactiontokenHashSeller1.toString(),
        EGT_PENDING,
        a,
        b
      )
    );

    const contractAddresses = await Promise.all(updatedData);
    console.log(contractAddresses); // Access the contract addresses here
    await createContractaInDB(
      "0x778Da7f696e6fb15BBeb62d6C345f65cDD94eC2E",
      currentAccount,
      deploymentData[0].adressFrom, // Assuming you want to use the first transaction's buyer address
      "0xb361aDEcc082167e102cF0004667e99BC406c370",
      deploymentData[0].taimeWaiting, // Assuming you want to use the first transaction's time waiting
      deploymentData[0].hash, // Assuming you want to use the first transaction's hash
      deploymentData[0].amount_Ether.toString(), // Assuming you want to use the first transaction's amount Ether
      transactiontokenHashSeller1.toString(),
      EGT_PENDING,
      "in process",
      new Date().toLocaleString(),
      contractAddresses

    );
  };


  const handleSubmit = async () => {
   await update_SC_Data2(); 
    setShowMyModel(true);

  };

  if (!visible) return null;

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md text-left">
        <h1 className="font-bold text-center text-lg my-1 mt-[-60px] mb-4">
          Create Smart Contract
        </h1>
        <div className="mt-8 ml-[-20px]">
          <p className="text-gray-700 mb-4">
            <span className="font-bold">
              Initiate smart contract with this information:
            </span>{" "}
          </p>
          {deploymentData && (
            <div className="mt-4">
     <p className="text-gray-700">
  <span className="font-bold text-blue-700">Seller: </span>{" "}
  <span className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1">
    {currentAccount}
  </span>
</p>
<p className="text-gray-700">
                Transaction block Token seller:  {transactiontokenHashSeller1.toString()}
              </p>
              <p className="text-gray-700">
                Amount Token : {EGT_PENDING}
              </p>
              {deploymentData.map((transaction) => (
                <div key={transaction.hash} className="border-b-2 pb-4 mb-4">
                  <p className="text-gray-700">
                    Buyer: {transaction.adressFrom}
                  </p>
                  <p className="text-gray-700">
                    Transaction Block Ether Buyer: {transaction.hash}
                  </p>
                  <p className="text-gray-700">
                    Price Ether: {transaction.amount_Ether.toString()}
                  </p>
                  <p className="text-gray-700">
                    Time waiting: {transaction.taimeWaiting}
                  </p>
                  {/* Add more lines to display other deployment information */}
                </div>
              ))}
              
              
              <p className="text-gray-700">
                Etat Contract : {'in process'}
              </p>
              <p className="text-gray-700">
                Date and Time  : {new Date().toLocaleString()}
              </p>
            </div>
          )}
          <div className="flex justify-between mt-8">
            <button
              className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 hover:bg-transparent ml-2 rounded-md bg-blue-500 text-white font-bold"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <Model_SC_ onClose={handleOnClose} visible={showMyModel} closeMe={onClose} closemepop5={closemepopup5} />
    </div>
  );
}

export { PopupBtween };
