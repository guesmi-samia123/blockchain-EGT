import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";
import dummyDta from "../utils/dummyDta.js";
import { ShortenAddress } from "../utils/shortenAdress.js";

 

const TransactionCard = ({
    addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  return (
    <div
      className="bg-[#152225] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl
    
    
    "
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className=" w-full mb-6 p-2 ">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {ShortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {ShortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount :{amount} Ether  </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
           <img
          src="../../images/transaction.png"
          alt="nature"
          className=" full-flex h-36 h-47 rounded-md shadow-lg object-cover"
        />


        <div><p>                                                 .</p></div>
           <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2 ">
            latest transaction
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2 ">
            connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10  ">
          {dummyDta.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
      
    </div>
  );
};
export default Transactions;
