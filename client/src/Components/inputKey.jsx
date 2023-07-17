import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";
import Modal from "react-modal";
import axios from "axios";
import { Transfinish1 } from "./transfinish1.jsx";
const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
  />
);

function InputKeySeller({ title }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const {
    currentAccount,
    formTransSeller,
    setTransSeller,
    handleChangeseller,
    contractTransport,
    compareStrings,
    verifyAddressAndPrivateKey,
  } = useContext(TransactionContext);
  const { pubSeller, keySeller, pubTransporter, keyTransporter } =
    formTransSeller;

  const handleUpdate = (a) => {
    console.log(a);
    axios
      .put("http://localhost:3002/UpdateDBrecuFromSeller", { a })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    const { pubSeller, keySeller, pubTransporter, keyTransporter } =formTransSeller;
    if (compareStrings(contractTransport.deliveryAdress, pubTransporter) === false
    ) {
      setPopupMessage("Address transportor not valid");
      setModalOpen(true);
    } else if (
      verifyAddressAndPrivateKey(pubTransporter, keyTransporter) === false
    ) {
      setPopupMessage("Signature transportor not correct");
      setModalOpen(true);
    } else if (
      compareStrings(pubSeller.toLowerCase(), contractTransport.seller) === false
    ) {console.log(pubSeller)
      console.log(contractTransport.seller)
      setPopupMessage("Seller address is not correct");
      setModalOpen(true);
    } else if (
      verifyAddressAndPrivateKey(pubSeller, keySeller) === false
    ) {
      setPopupMessage("Seller signature not correct ");
      setModalOpen(true);
    }else {
      handleUpdate(contractTransport.adress_contract);
      setPopupMessage("Successfully verification ! ");
      setModalOpen(true);
    }
  };

  return (
    <div>
      <h1 className="text-white text-2xl sm:text-5xl py-2 text-gradient ">
        {title}
      </h1>
      <br />
      <div className="p-5 sm:w-97 w-full  flex-col  justify-around items-center  blue-glassmorphism2 ">
        <p className="my-2  p-3 outline-none bg-transparent text-white border-none text-sm  ">
          Seller
        </p>
        <Input
          placeholder="Public Address Seller"
          name="pubSeller"
          type="text"
          handleChange={handleChangeseller}
        />
        <Input
          placeholder="Private key Seller"
          name="keySeller"
          type="password"
          handleChange={handleChangeseller}
        />
        <Input
          placeholder="Public Address Transporter"
          name="pubTransporter"
          type="text"
          handleChange={handleChangeseller}
        />
        <Input
          placeholder="Private key Transporter"
          name="keyTransporter"
          type="password"
          handleChange={handleChangeseller}
        />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {false ? (
          <Loader />
        ) : (
          <button
            type="button"
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        )}

        <Modal
          isOpen={modalOpen}
          onRequestHide={() => setModalOpen(false)}
          aria-labelledby="modal-label"
        >
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="modal-label">
                    Popup Message
                  </h4>
                </div>
                <div className="modal-body">
                  <p>{popupMessage}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-default"
                    onClick={() =>setModalOpen(false) }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export { InputKeySeller };

const Input2 = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
  />
);

function InputKeyBuyer({ title }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const {
    
    currentAccount,
    formTransBuyer,
    setTransBuyer,
    handleChangebuyer,
    contractTransport,
    compareStrings,
    verifyAddressAndPrivateKey,
    transferToken,
    getEthereumContract,
    hashtxfinish2,
    sethashtxfinish2,
  } = useContext(TransactionContext);
  const [showMyModel, setShowMyModel] = useState(false);
  const handleOnClose = () => setShowMyModel(false);
  let hashh;
  const handleUpdate = (hashTx1_Finish, adress_contract) => {
    axios
      .put(
        "http://localhost:3002/Updatetx2finish",
        { hashTx1_Finish },
        { adress_contract }
      )
      .then((response) => {
        console.log(response.data);
        console.log("data updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    const { pubBuyer, keyBuyer, pubTransporter, keyTransporter } =formTransBuyer;
    hashh =  await transferToken(contractTransport.mtTX2,contractTransport.buyer);
    sethashtxfinish2(hashh.hash)
    
    setShowMyModel(true);
/*
  if (compareStrings(contractTransport.deliveryAdress, pubTransporter) === false
  ) {
    console.log(contractTransport.deliveryAdress);
    console.log(keyBuyer);
    setPopupMessage(" Address transportor not valid");
    setModalOpen(true);
  } else if (
    verifyAddressAndPrivateKey(pubTransporter, keyTransporter) === false
  ) {
    setPopupMessage(" Signature  transportor is not correct");
    setModalOpen(true);
  } else if (
    compareStrings(pubBuyer.toLowerCase(), contractTransport.buyer) === false
  ) {
    setPopupMessage("Buyer address is not correct");
    setModalOpen(true);
  } else if (
    verifyAddressAndPrivateKey(pubBuyer, keyBuyer) === false
  ) {
    setPopupMessage("Buyer signature not correct ");
    setModalOpen(true);  
  } else {
     
  } */ }
  return (
    <div>
      <h1 className="text-white text-2xl sm:text-5xl py-2 text-gradient ">
        {title}
      </h1>
      <br />
      <div className="p-5 sm:w-97 w-full  flex-col  justify-around items-center  blue-glassmorphism2 ">
        <p className="my-2  p-3 outline-none bg-transparent text-white border-none text-sm  ">
          Buyer
        </p>
        <Input2
          placeholder="Public Address Buyer"
          name="pubBuyer"
          type="text"
          handleChange={handleChangebuyer}
        />
        <Input2
          placeholder="Private key Buyer"
          name="keyBuyer"
          type="password"
          handleChange={handleChangebuyer}
        />
        <Input2
          placeholder="Public Address Transporter"
          name="pubTransporter"
          type="text"
          handleChange={handleChangebuyer}
        />
        <Input2
          placeholder="Private key Transporter"
          name="keyTransporter"
          type="password"
          handleChange={handleChangebuyer}
        />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {false ? (
          <Loader />
        ) : (
          <button
            type="button"
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        )}
      </div>

      <Transfinish1
        onClose={handleOnClose}
        visible={showMyModel}
        param1={contractTransport.mtTX1}
        param2={contractTransport.seller}
        param3={contractTransport.mTx3}
        param4={contractTransport.deliveryAdress}
        param5={hashh}
      />
      
      <Modal
          isOpen={modalOpen}
          onRequestHide={() => setModalOpen(false)}
          aria-labelledby="modal-label"
        >
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="modal-label">
                    Popup Message
                  </h4>
                </div>
                <div className="modal-body">
                  <p>{popupMessage}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-default"
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
    </div>
  );
}

export { InputKeyBuyer };
