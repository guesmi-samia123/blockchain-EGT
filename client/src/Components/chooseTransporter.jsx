import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";
import {contractPurchaseN1_ABI} from "../utils/constants";
import axios from "axios";

export default function ChooseTransporter({ visible, onClose1, onclose2, onclose3, onclose4 }) {
  const [addressTo, setAddressTo] = useState(""); // State to hold the entered address
  const {
    currentAccount,
    getEthereumContract,
    adressContractPurchase,
    sendEther,
    transactionEthHash3,
  } = useContext(TransactionContext);
 
  if (!visible) return null;
  const handleUpdate = (transporter, hashTX3,mtTX3,adress_contract) => {
    axios
      .put("http://localhost:3002/updateContract1", { transporter, hashTX3,mtTX3,adress_contract })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };


  const handleSubmit = async (e) => {
    // send ether
    const transactionHash = await sendEther('0.00008', '0xb361aDEcc082167e102cF0004667e99BC406c370', currentAccount);
    //updat esmartcontract
    const contract =getEthereumContract(adressContractPurchase,contractPurchaseN1_ABI);
    
    await contract.update_initiate1(addressTo,transactionHash,'0.00008');
    // update DB
    handleUpdate(addressTo,transactionHash,'0.00008',adressContractPurchase);
    console.log ("bravo evry thimg is ok AMENI , thanks God <3")
    
    
    onClose1();
    onclose2();
    onclose3();
    onclose4();
  };

  const handleAddressChange = (e) => {
    setAddressTo(e.target.value); // Update the address state with the input's value
  };

  const renderPriceComponent = () => {
    if (addressTo) {
      return (
        <p className="text-gray-700">
          <span className="font-bold">0.00008 ETH</span>{" "}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex  justify justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md text-left  ">
        <h1 className="font-bold  text-center text-lg my-1 mt-[-60px] mb-4">
          {" "}
          Choose Transpoter
        </h1>
        <div className=" mt-8 ml-[-20px]">
          <p className="text-gray-700">
            <span className="font-bold">Address: </span>{" "}
          </p>
          <input
            placeholder="Address Transporter"
            name="addressTo"
            type="text"
            value={addressTo}
            onChange={handleAddressChange}
          />
          {renderPriceComponent()}
          <br />
          <div className="flex justify-between mt-8">
            <button
              className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 hover:bg-transparent ml-2"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
