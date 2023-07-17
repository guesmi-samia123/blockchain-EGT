import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


function InputKeySeller({ title }) {
  const { formTransSeller, setTransSeller, handleChangeseller } =
  useContext(TransactionContext);
  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChangeseller(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
  );

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
          placeholder="Public Address Seller "
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
          >
            {" "}
            Send Now
          </button>
        )}
      </div>
    </div>
  );
}

export { InputKeySeller };

function InputKeyBuyer({ title }) {
  const { formTransBuyer, setTransBuyer, handleChangebuyer } =
    useContext(TransactionContext);
  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChangebuyer(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
  );
  const [data, setData] = useState([]);

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
        <Input
          placeholder="Public Address Buyer "
          name="pubBuyer"
          type="text"
          handleChange={handleChangebuyer}
        />
        <Input
          placeholder="Private key Buyer"
          name="keyBuyer"
          type="password"
          handleChange={handleChangebuyer}
        />
        <Input
          placeholder="Public Address Transporter"
          name="pubTransporter"
          type="text"
          handleChange={handleChangebuyer}
        />
        <Input
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
          >
            {" "}
            Send Now
          </button>
        )}
      </div>
    </div>
  );
}

export { InputKeyBuyer };
