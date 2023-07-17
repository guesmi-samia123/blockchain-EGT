// to interact react application with an ethereum smart contract 
import abi from './Transactions.json';
import abi2 from './energyToken.json';
import abi3 from './ContractPurchaseN1.json';
import bytecode from './ContractPurchaseN1.json';
 
// Transaction info
export const ContractABI= abi.abi;

export const contractAdress ='0x46a19127a6e57fe01505fec2BD93Af759d4149dc';

// Energy Token inf
export const ContractEGT_ABI =abi2.abi;

export const contractEGT_Adress = '0x778Da7f696e6fb15BBeb62d6C345f65cDD94eC2E';

//  contractPurchaseN1

export const contractPurchaseN1_ABI =abi3.abi;
//0xbe58d37620691738265e6eaF2eA973F093D3A3B9
export const contractPurchaseN1_Adress = "0xe0C1648b23c6EC6a7192770417bFb4340878E704";
 export const contractPurchaseN1_bytecode = bytecode.bytecode;
