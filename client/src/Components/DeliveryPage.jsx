import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import Footer from "./Footer.jsx";
import { InputKeySeller, InputKeyBuyer } from "./inputKey.jsx";
import { TransactionContext } from "../context/TransactionContext.jsx";

const DeliveryPage = () => {
  const [data, setData] = useState([]);
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);
  const [data2, setData2] = useState([]);
  const [showInputKey, setShowInputKey] = useState(false);
  const [showInputKeyBuyer, setShowInputKeyBuyer] = useState(false);
  const {currentAccount, contractTransport,setContractTransport} = useContext(TransactionContext);
  
  
  const etat = "in process";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/readContract/${currentAccount}/${etat}`
          

        );
        setData2(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentAccount, etat]);

  const handleSellerButtonClick = (contract) => {
    
      setShowInputKey(true);
      setShowInputKeyBuyer(false);
      setContractTransport(contract);
    
  };

  const handleBuyerButtonClick = (contract) => {
    
      setShowInputKey(false);
      setShowInputKeyBuyer(true);
      setContractTransport(contract);
    
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-center items gradient-bg-transactions">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start ">
    <div className="flex flex-col items-center">
      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
        Transporter process
      </h1>
      <br></br>
      <div className="flex justify-center">
        <div className="transaction-container">
          <div className="transaction-list">
            {data2.map((contract, index) => (
              <div key={index} className="transaction-card">
                <div className="transaction-details">
                  <div className="transaction-field">
                    <span className="field-label">Contract Address:</span>
                    <span className="field-value">{contract.adress_contract}</span>
                  </div>

                  <div className="transaction-field">
                    <span className="field-label">Seller:</span>
                    <span className="field-value">{contract.seller}</span>
                  </div>

                  <div className="transaction-field">
                    <span className="field-label">Buyer:</span>
                    <span className="field-value">{contract.buyer}</span>
                  </div>

                  <div className="transaction-field">
                    <span className="field-label">Amount Energy (KW):</span>
                    {/* Add value here */}
                  </div>

                  <div className="transaction-field">
                    <span className="field-label">Date:</span>
                    <span className="field-value">{contract.date_creation}</span>
                  </div>

                  <div className="transaction-field">
                    <span className="field-label">Transaction:</span>
                    <span className="field-value">{contract.hashTx3}</span>
                  </div>
                  <div className="transaction-field">
                    <span className="field-label">Recieve Energy KW by Seller :</span>
                    <span className="field-value">{contract.recieveEnergyBySeller}</span>
                  </div>
                </div>
                

                <div className="transaction-actions">
                  <button
                    className={`text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer ${
                      contract.recieveEnergyBySeller === "No" ? "" : "opacity-50"
                    }`}
                    onClick={() => handleSellerButtonClick(contract)}
                    disabled={contract.recieveEnergyBySeller !== "No"}
                  >
                    Seller
                  </button>
                  <button
                    className={`text-white w-full mt-7 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer ${
                      contract.recieveEnergyBySeller === "Yes" ? "" : "opacity-50"
                    }`}
                    onClick={() => handleBuyerButtonClick(contract)}
                    disabled={contract.recieveEnergyBySeller !== "Yes"}
                  >
                    Buyer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showInputKey && <InputKeySeller />}
      {showInputKeyBuyer && <InputKeyBuyer />}
      </div> 
      </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
