import React, { useEffect,useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle, BsSendX } from "react-icons/bs";
import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext.jsx";
import { ShortenAddress } from "../utils/shortenAdress.js";
import dummyDta from "../utils/dummyDta";
import MyModel from "./Model1";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
