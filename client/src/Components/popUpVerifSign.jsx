import { TransactionContext } from "../context/TransactionContext.jsx";
import { IoWarning } from "react-icons/io5";
import React, { useEffect, useContext, useState } from "react";

export const ErrorData = ({ visible, onClose,param1 }) => {
    if (!visible) return null;
  return (
    <div className=" mt-8 ml-[-20px]">
      <div className="mt-4">
        <p className="bg-[#ffe9d9] p-2 border-l-2 border-[#fa703f] text-[#bc4c2e] flex flex-col text-sm my-1">
          <span className="text-[#771505] font-bold flex item-center gap-1">
            <IoWarning />
            Warning
          </span>
          {param1}
        </p>
      </div>
      <p className="text-gray-700">
        <span className="font-bold">Tray Again</span> 
      </p>
        <BackButton onClick={onClose} />
      </div>
  );
};

const CorrectSign = (props) =>  {
    return (
      <div className=" mt-8 ml-[-20px]">
        <div className="mt-4">
          
        </div>
        <p className="text-gray-700">
          <span className="font-bold">{props.param1}</span> 
        </p>
          <BackButton onClick={props.param2} />
        </div>
    );
  };

export { CorrectSign };
