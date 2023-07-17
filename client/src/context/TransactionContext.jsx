import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import {
  ContractABI,
  contractAdress,
  ContractEGT_ABI,
  contractEGT_Adress,
  contractPurchaseN1_ABI,
  contractPurchaseN1_Adress,
  contractPurchaseN1_bytecode,
} from "../utils/constants";
import Axios from "axios";
import axios from "axios";

// manage the global state of the transactions
export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = (contractadress, contractabi) => {
  //create ethereum provider instance "metamask "
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractadress,
    contractabi,
    signer
  );

  //return transactionContract;
  console.log({
    provider,
    signer,
    transactionContract,
  });
  return transactionContract;
};
// get the adress of the smart contract created returned by the dessus function
/*const contract =getEthereumContract(contractPurchaseN1_Adress,contractPurchaseN1_ABI);
     let contractAddress;
       contract.getContractAddress().then((address) => {
       contractAddress = address;
       console.log(contractAddress);})
       .catch((error) => {
        console.log(error);
      });*/

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [EnergyTokenAmount, setEnergyTokenAmount] = useState();
  const [EtherEneryRequested, setEtherEneryRequested] = useState();
  const [BalanceCurrentAccount, setBalanceCurrentAccount] = useState();
  const [BalanceAdressTo, setBalanceAdressTo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [balanceOfToken, setBalanceOfToken] = useState();
  const [EGT_PENDING, setEGT_PENDING] = useState();
  const [adressContractPurchase, setAdressContractPurchase] = useState('0x0000000000000000000000000000000000000000');
  const [transactiontokenHashSeller1, setTransactiontokenHashSeller1] =useState();
  const [transactionEthHash, setransactionEthHash] = useState();
  const [transactionEthHash3, setTransactionEthHash3] = useState();
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount"),);
  const [contractTransport, setContractTransport] = useState();
  const [hashtxfinish1, sethashtxfinish1] = useState();
  const [hashtxfinish2, sethashtxfinish2] = useState();
  const [hashtxfinish3, sethashtxfinish3] = useState();
  

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    amount_Energy: "",
    time_waiting: "",
    message: "",
  });
  const [formTransSeller, setTransSeller] = useState({
    pubSeller: "",
    keySeller: "",
    pubTransporter: "",
    keyTransporter: "",
    
  });
  const [formTransBuyer, setTransBuyer] = useState({
    pubBuyer: "",
    keyBuyer: "",
    pubTransporter: "",
    keyTransporter: "",
    
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const handleChangebuyer = (e, name) => {
    setTransBuyer((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const handleChangeseller = (e, name) => {
    setTransSeller((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("please install metamask ");
      //get our metamask  connected accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        console.log(accounts);
        setCurrentAccount(accounts[0]);
        //getAllTransactions();
      } else {
        console.log("no accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("no ethereum object.");
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const currentTransactionCount =
        await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", currentTransactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask ");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(accounts);
      console.log("account connected is" + accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("no ethereum object.");
    }
  };

  const sendEtherByDf = async () => {
    try {
      const {
        addressTo,
        amount,
        amount_Energy,
        keyword,
        time_waiting,
        message,
      } = formData;
      console.log("energy kilowatt" + amount_Energy);

      const parsedAmount = ethers.utils.parseEther(EtherEneryRequested);
      console.log(EtherEneryRequested);
      console.log(parsedAmount);
      const transactionHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: "0xb361aDEcc082167e102cF0004667e99BC406c370",
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      setransactionEthHash(transactionHash);
      /********** */
      Axios.post("http://localhost:3002/create", {
        adressFrom: currentAccount,
        adress_To: addressTo,
        hash: transactionHash,
        Time_waiting: parseInt(time_waiting),
        amount_Ether: parseFloat(EtherEneryRequested),
        amount_energyToken: parseFloat(EnergyTokenAmount),
        DateTime: new Date().toLocaleString(),
        EnergyAmount: amount_Energy,
      }).then(() => {
        console.log("succes DB add");
      });
      console.log();
      /********** */
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask ");
      //get the data from the form
      const {
        addressTo,
        amount,
        amount_Energy,
        keyword,
        time_waiting,
        message,
      } = formData;
      console.log(amount);
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log(parsedAmount);
      const transactionContract = getEthereumContract();
      //sending ethereum from an adress to another adress
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      //wait the transaction to be finish
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Succes - ${transactionHash.hash}`);
      const transactionsCount = transactionContract.getTransactionCount();
      setTransactionCount(transactionsCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, []);

  const hexToDecimal = (hex) => parseInt(hex, 16);

  const buyEnergyToken = async () => {
    try {
      const EnergyTokenContract = getEthereumContract(
        contractEGT_Adress,
        ContractEGT_ABI
      );
      const {
        addressTo,
        amount,
        amount_Energy,
        keyword,
        time_waiting,
        message,
      } = formData;
      // get the Balance of EGT   TOKEN
      const promiseResult = await EnergyTokenContract.balanceOf(addressTo);
      const hexValue = promiseResult._hex;
      const decimalValue = parseInt(hexValue, 16);
      const formattedValue = decimalValue.toLocaleString("fullwide", {
        useGrouping: false,
      });
      console.log(formattedValue);
      //convert energy KWT to energy token
      const energyToken_Hex = await EnergyTokenContract.convertToTokens(
        amount_Energy
      );
      const energyToken = hexToDecimal(energyToken_Hex._hex).toString();
      //convert energyToken to ether
      const EnergyToEther_Hex = await EnergyTokenContract.convertToEther(
        energyToken
      );
      const EnergyToEther = ethers.utils.formatEther(
        hexToDecimal(EnergyToEther_Hex._hex).toString()
      );
      //get the balance of ether for the current account
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balanceInWei = await provider.getBalance(currentAccount);
      const balanceInEther = ethers.utils.formatEther(balanceInWei);
      // Set the states
      await setEnergyTokenAmount(energyToken);
      await setEtherEneryRequested(EnergyToEther);
      await setBalanceCurrentAccount(balanceInEther);
      console.log(balanceInEther);
      await setBalanceAdressTo(formattedValue);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {}, [
    EnergyTokenAmount,
    EtherEneryRequested,
    BalanceCurrentAccount,
    transactionEthHash,
    currentAccount,
    balanceOfToken,
    EGT_PENDING,
    adressContractPurchase,
    transactionEthHash3,
  ]);

  const addTransactionDB2 = () => {
    const { addressTo, amount, amount_Energy, time_waiting, message } =
      formData;
    Axios.post("http://localhost:3002/create", {
      adressFrom: currentAccount,
      adress_To: addressTo,
      hash: transactionEthHash,
      Time_waiting: parseInt(time_waiting),
      amount_Ether: parseFloat(amount),
      amount_energyToken: parseFloat(amount_Energy),
      DateTime: new Date().toLocaleString(),
    }).then(() => {
      console.log("succes DB add");
    });
  };
  const TransferTokenEnegy = async (amountEgt) => {
    try {
      const ContractEGT = getEthereumContract(
        contractEGT_Adress,
        ContractEGT_ABI
      );
      const owneradr = "0xe45A36c2e6F47F978DcdbC69bD6a6F52D2431bA2";
      const spender = "0xB08e9bbB03e3033febA747d200deFb6F1313f183";
      const from = currentAccount;
      const to = "0xb361aDEcc082167e102cF0004667e99BC406c370";
      const amount = ethers.utils.parseUnits(amountEgt, 18);
      await ContractEGT.allowance(owneradr, spender);
      await ContractEGT.approve(spender, amount);
      const tx = await ContractEGT.transfer(
        to,
        amount,
        { gasLimit: ethers.BigNumber.from("400000") } // Adjust the gas limit as per your requirements
      );
      await tx.wait(); // Wait for the transaction to be mined

      const txHash = tx.hash;
      setTransactiontokenHashSeller1(tx.hash);
      console.log("Transaction hash:", txHash);
      console.log("Tokens transferred successfully.");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  // send  transferFrom
  async function sendTokens() {
    try {
      const senderAddress = "0xb361aDEcc082167e102cF0004667e99BC406c370";
      const senderPrivateKey =
        "cfbf6fbb8352f416611f3323ed2fbb9bd0c20aebeec015b29f52a2ac0777e7b1";
   const recipientAddress = "0x59eDD0CfB10F078124642C84aFca86A90A731eda";
      
    const tokenAmount = "100";
      const contract = getEthereumContract(contractEGT_Adress, ContractEGT_ABI);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const nonce = await provider.getTransactionCount(senderAddress);
      const gasPrice = await provider.getGasPrice();
      /* const gasEstimate = await contract
      .transfer(recipientAddress, tokenAmount)
      .estimateGas({ from: senderAddress });*/
      const txObject = {
        from: senderAddress,
        to: contractEGT_Adress,
        value: "0",
        data: contract.transfer(recipientAddress, tokenAmount).encodeABI(),
        gas: gasPrice,
        gasPrice: gasPrice,
        nonce: nonce,
      };
      const signedTx = await provider.accounts.signTransaction(
        txObject,
        senderPrivateKey
      );
      const txReceipt = await provider.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("Transaction receipt:", txReceipt);
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
  }

  async function sendTokens2() {
    try {
      const senderAddress = "0xe45A36c2e6F47F978DcdbC69bD6a6F52D2431bA2";
      const senderPrivateKey =
        "aa2b6da7328f00e30a580c24c0329df3b8a555e203be5a337a0485a8c000da55";
      const recipientAddress = "0x59eDD0CfB10F078124642C84aFca86A90A731eda";
      //const tokenAmount = '100';
      const tokenAmount = ethers.utils.parseUnits("10000", 18);
      // Set up the MetaMask provider
      await ethereum.enable();
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Create a new Wallet instance using the sender's private key
      const wallet = new ethers.Wallet(senderPrivateKey, provider);
      const nonce = await provider.getTransactionCount(senderAddress);
      const gasPrice = await provider.getGasPrice();
      // Create a contract instance
      const contract = new ethers.Contract(
        contractEGT_Adress,
        ContractEGT_ABI,
        wallet
      );
      // Prepare the transfer function call data
      const transferData = contract.interface.encodeFunctionData("transfer", [
        recipientAddress,
        tokenAmount,
      ]);
      const gasLimit = ethers.BigNumber.from("200000");
      // Create the transaction object
      const txObject = {
        from: senderAddress,
        to: contractEGT_Adress,
        value: ethers.constants.Zero,
        data: transferData,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        nonce: nonce,
      };
      // Sign the transaction
      const signedTx = await wallet.signTransaction(txObject);
      // Send the signed transaction via MetaMask provider
      const txResponse = await provider.sendTransaction(signedTx);
      console.log("Transaction sent:", txResponse);
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
  }
  //function update the status of transaction
  const handleUpdate = (hash, newEtat) => {
    axios
      .put("http://localhost:3002/update", { hash, newEtat })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  // function to deploy instance of smartContract
  async function deployContract(seller,buyer,resvWallet,timeWaiting,hashTX1,mtTX1,hashTX2,mtTX2,etat,date_crated) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractFactory = new ethers.ContractFactory(
      contractPurchaseN1_ABI,
      contractPurchaseN1_bytecode,
      signer
    );
    try {
      const contractInstance1 = await contractFactory.deploy(
        "0x778Da7f696e6fb15BBeb62d6C345f65cDD94eC2E",
        seller,
        buyer,
        resvWallet,
        timeWaiting,
        hashTX1,
        mtTX1,
        hashTX2,
        mtTX2,
        etat,
        date_crated
      );
      // Deploy additional instances as needed
      await contractInstance1.deployed();
      console.log(
        "contractPurchaseN1 deployed at address:",
        contractInstance1.address
      );
      setAdressContractPurchase(contractInstance1.address);
      return contractInstance1.address;
    } catch (error) {
      console.error(error);
    }
  }
  const sendEther = async (amount,adressto,adressfrom) => {
    try {
      //const amountt =parseFloat(amount);
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log(amount);
      console.log(parsedAmount);
      const transactionHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: adressfrom,
            to: adressto,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      setTransactionEthHash3(transactionHash);
      console.log (transactionHash);
      return transactionHash;
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  function compareStrings(string1, string2) {
    return string1 == string2;
  }
  function verifyAddressAndPrivateKey(publicAddress, privateKey) {
    try {
      const wallet = new ethers.Wallet(privateKey);
      const derivedAddress = wallet.address;
      
      return derivedAddress.toLowerCase() === publicAddress.toLowerCase();
    } catch (error) {
      console.error('Error verifying address and private key:', error);
      return false;
    }
  }

  const transferToken = async (Amount, recipientAddress) => {
    try {
      const senderAddress = "0xb361aDEcc082167e102cF0004667e99BC406c370";
      const senderPrivateKey = "cfbf6fbb8352f416611f3323ed2fbb9bd0c20aebeec015b29f52a2ac0777e7b1";
     // const recipientAddress = "0x59eDD0CfB10F078124642C84aFca86A90A731eda";
      //const tokenAmount = '100';
      const tokenAmount = ethers.utils.parseUnits(Amount, 18);
      // Set up the MetaMask provider
      await ethereum.enable();
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Create a new Wallet instance using the sender's private key
      const wallet = new ethers.Wallet(senderPrivateKey, provider);
      const nonce = await provider.getTransactionCount(senderAddress);
      const gasPrice = await provider.getGasPrice();
      // Create a contract instance
      const contract = new ethers.Contract(
        contractEGT_Adress,
        ContractEGT_ABI,
        wallet
      );
      // Prepare the transfer function call data
      const transferData = contract.interface.encodeFunctionData("transfer", [
        recipientAddress,
        tokenAmount,
      ]);
      const gasLimit = ethers.BigNumber.from("200000");
      // Create the transaction object
      const txObject = {
        from: senderAddress,
        to: contractEGT_Adress,
        value: ethers.constants.Zero,
        data: transferData,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        nonce: nonce,
      };
      // Sign the transaction
      const signedTx = await wallet.signTransaction(txObject);
      // Send the signed transaction via MetaMask provider
      const txResponse = await provider.sendTransaction(signedTx);
      //console.log("Transaction sent:", txResponse.hash);
      return (txResponse)
     
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
  };
  
  const transferEther6 = async (amount, addressTo) => {
    try {
      
      const provider = new ethers.providers.Web3Provider(ethereum);
  
      const senderAddress = '0xb361aDEcc082167e102cF0004667e99BC406c370';
      const senderPrivateKey =
        'cfbf6fbb8352f416611f3323ed2fbb9bd0c20aebeec015b29f52a2ac0777e7b1';
  
      const wallet = new ethers.Wallet(senderPrivateKey, provider);
      const nonce = await provider.getTransactionCount(senderAddress);
      //const gasPrice = await provider.getGasPrice();
    const gasPrice = ethers.BigNumber.from('6');
      const gasLimit = ethers.BigNumber.from('987737');

      const transaction = {
        from: senderAddress,
        to: addressTo,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        value: ethers.utils.parseEther(amount),
        nonce: nonce,
      };
  
      const signedTransaction = await wallet.signTransaction(transaction);
      const txResponse = await provider.sendTransaction(signedTransaction);
  
     return (txResponse);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to send ether');
    }
  };
  const transferEther1 = async (amount, recipientAddress) => {
    try {
      const senderAddress = "0xb361aDEcc082167e102cF0004667e99BC406c370";
      const senderPrivateKey = "cfbf6fbb8352f416611f3323ed2fbb9bd0c20aebeec015b29f52a2ac0777e7b1";
      const etherAmount = ethers.utils.parseEther(amount);
      
      // Set up the provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      
      // Create a new Wallet instance using the sender's private key
      const wallet = new ethers.Wallet(senderPrivateKey, provider);
      
      const nonce = await provider.getTransactionCount(senderAddress);
      const gasPrice = await provider.getGasPrice();
      const gasLimit = 210000; // Gas limit for a basic Ether transfer
      
      // Create the transaction object
      const transaction = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: recipientAddress,
        value: etherAmount,
      };
      
      // Sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);
      
      // Send the signed transaction
      const txResponse = await provider.sendTransaction(signedTransaction);
      
      console.log("Transaction sent:", txResponse.hash);
      return txResponse;
    } catch (error) {
      console.error("Error sending Ether:", error);
    }
  };
  const transferEther2 = async (amount, recipientAddress) => {
    try {
      const senderAddress = "0xb361aDEcc082167e102cF0004667e99BC406c370";
      const senderPrivateKey = "cfbf6fbb8352f416611f3323ed2fbb9bd0c20aebeec015b29f52a2ac0777e7b1";
      const etherAmount = ethers.utils.parseEther(amount);
      
      // Set up the provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      
      // Create a new Wallet instance using the sender's private key
      const wallet = new ethers.Wallet(senderPrivateKey, provider);
      
      const nonce = await provider.getTransactionCount(senderAddress);
      const gasPrice = await provider.getGasPrice();
      const gasLimit = 21000; // Gas limit for a basic Ether transfer
      
      // Create the transaction object
      const transaction = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: recipientAddress,
        value: etherAmount,
      };
      
      // Sign the transaction
      const signedTransaction = await wallet.signTransaction(transaction);
      
      // Send the signed transaction
      const txResponse = await provider.sendTransaction(signedTransaction);
      
      console.log("Transaction sent:", txResponse.hash);
      return txResponse;
    } catch (error) {
      console.error("Error sending Ether:", error);
    }
  };
  


  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        buyEnergyToken,
        sendEtherByDf,
        setransactionEthHash,
        EnergyTokenAmount,
        EtherEneryRequested,
        BalanceCurrentAccount,
        BalanceAdressTo,
        transactionEthHash,
        addTransactionDB2,
        TransferTokenEnegy,
        sendTokens,
        sendTokens2,
        balanceOfToken,
        setBalanceOfToken,
        EGT_PENDING,
        setEGT_PENDING,
        handleUpdate,
        getEthereumContract,
        deployContract,
        adressContractPurchase,
        transactiontokenHashSeller1,
        sendEther,
        transactionEthHash3,
        formTransBuyer,
        setTransBuyer,
        formTransSeller,
        setTransSeller,
        handleChangebuyer,
        handleChangeseller,
        contractTransport,
         setContractTransport,
         compareStrings,
         verifyAddressAndPrivateKey,
         transferToken,
         transferEther1,
         transferEther2,
         hashtxfinish2,
          sethashtxfinish2,
          hashtxfinish1,
          sethashtxfinish1,
          hashtxfinish3, sethashtxfinish3

      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
