import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TransactionContext } from "../context/TransactionContext.jsx";
import ModelAcceptance from "./modelAccept.jsx";
import { ethers } from "ethers";
import {
  ContractEGT_ABI,
  contractEGT_Adress,
  contractPurchaseN1_ABI,
  contractPurchaseN1_Adress,
} from "../utils/constants";

const { ethereum } = window;
const getEthereumContract = (contractadress, contractabi) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractadress,
    contractabi,
    signer
  );
  return transactionContract;
};

const PendingTransaction = () => {
  const [data, setData] = useState([]);
  const {
    currentAccount,
    balanceOfToken,
    setBalanceOfToken,
    EGT_PENDING,
    setEGT_PENDING,
    setransactionEthHash
  } = useContext(TransactionContext);
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);

  /*axios
    .get(`http://localhost:3002/read/${currentAccount}`)
    .then((res) => setData(res.data));*/

    const [data2, setData2] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/read/${currentAccount}`);
      setData2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [currentAccount]);


  const handleRefuse = (index, hash) => {
    axios
      .delete(`http://localhost:3002/delete/${hash}`)
      .then((res) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData2(updatedData);
      })
      .catch((err) => console.log(err));
  };
  const getBalanceOf = async (e) => {
    try {
      const contract = await getEthereumContract(
        contractEGT_Adress,
        ContractEGT_ABI
      );
      const balanceOfEGT = await contract.balanceOf(currentAccount);
      const balanceHex = balanceOfEGT._hex;
      const balanceDecimal = BigInt(balanceHex);
      setBalanceOfToken(balanceDecimal.toString());
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e, amountEnergyToken, transactionEthHashB_RESRV) => {
    try {
      //get balance
      const contract = await getEthereumContract(
        contractEGT_Adress,
        ContractEGT_ABI
      );
      const balanceOfEGT = await contract.balanceOf(currentAccount);
      const balanceDecimal = balanceOfEGT.toString();
      const decimals = 18; // Replace with the actual number of decimals for your token
      const adjustedBalance = balanceDecimal / 10 ** decimals;
      console.log(adjustedBalance);
      setBalanceOfToken(adjustedBalance);
      // get amount energy token
      setEGT_PENDING(amountEnergyToken);
      setransactionEthHash(transactionEthHashB_RESRV);
      setShowMyModel(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [balanceOfToken]);

  return (
    <div className="flex flex-col md:flex-row w-full justify-center items gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start ">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Pending Transaction
          </h1>
          <br />
          <div className="flex-1 flex flex-col justify-start items-center">
            <div className="">
              <div className="transaction-container">
                <div className="transaction-list">
                  {data2.map((transaction, index) => (
                    <div key={index} className="transaction-card ">
                      <div className="transaction-details">
                        <div className="transaction-field">
                          <span className="field-label">Hash:</span>
                          <span className="field-value">
                            {transaction.hash}
                          </span>
                        </div>

                        <div className="transaction-field">
                          <span className="field-label">Time Waiting:</span>
                          <span className="field-value">
                            {transaction.taimeWaiting}
                          </span>
                        </div>

                        <div className="transaction-field">
                          <span className="field-label">Date & Time:</span>
                          <span className="field-value">
                            {transaction.DateTime}
                          </span>
                        </div>

                        <div className="transaction-field">
                          <span className="field-label">From:</span>
                          <span className="field-value">
                            {transaction.adressFrom}
                          </span>
                        </div>

                        <div className="transaction-field">
                          <span className="field-label">Ether Reserved:</span>
                          <span className="field-value">
                            {transaction.amount_Ether}
                          </span>
                        </div>

                        <div className="transaction-field">
                          <span className="field-label">
                            Token Energy Requested:
                          </span>
                          <span className="field-value">
                            {transaction.amount_energyToken}
                          </span>
                        </div>
                      </div>

                      <div className="transaction-actions">
                        <button
                          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                          onClick={(e) =>
                            handleSubmit(e, transaction.amount_energyToken, transaction.hash)
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="text-white w-full mt-7 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                          onClick={() => handleRefuse(index, transaction.id_tx)}
                        >
                          Refuse
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModelAcceptance onClose={handleOnClose} visible={showMyModel} />
    </div>
  );
};

export default PendingTransaction;
