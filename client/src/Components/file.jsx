import { TransactionContext } from "../context/TransactionContext.jsx";
import {useContext ,useState} from "react";
import{contractPurchaseN1_ABI} from "../utils/constants";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ChooseTransporter from "./chooseTransporter.jsx";


function Model_SC_({ visible, onClose, closeMe,closemepop5 }) {
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);
  const navigateTo = useNavigate();
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
  if (!visible) return null;
  const handleSubmit = async  (e) => { 
    setShowMyModel(true);
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex  justify justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md text-left  ">
        <h1 className="font-bold  text-center text-lg my-1 mt-[-60px] mb-4">
          {" "}
          CONTRACT CREATED SUCCESSFULLY
        </h1>
        <div className=" mt-8 ml-[-20px]">
          <p className="text-gray-700">
            <span className="font-bold">Adress of smart contract</span>{" "}
            {adressContractPurchase}
          </p>
          <br />
          <div className="flex justify-between mt-8">
            <button
              className="outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 hover:bg-transparent ml-2" onClick={handleSubmit}
            >
              Choose Transporter
            </button>
          </div>
        </div>
      </div>
      <ChooseTransporter onClose1={handleOnClose} onclose2={onClose} onclose3= {closeMe} onclose4={closemepop5} visible={showMyModel} />
    </div>
  );
};
export { Model_SC_ };