const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "cryptoenergy",
  });
  
  app.post("/create", (req, res) => {
    const adressFrom = req.body.adressFrom;
    const adressTo = req.body.adress_To;
    const hash = req.body.hash;
    const TimeWaiting = req.body.Time_waiting;
    const amount_Ether =  req.body.amount_Ether;
    const amount_energyToken = req.body.amount_energyToken;
    const DateTime=req.body.DateTime;
    const EnergyAmount = req.body.EnergyAmount;
  
    db.query(
      "INSERT INTO transaction (hash, adressTo, adressFrom, taimeWaiting, amount_Ether,amount_energyToken,DateTime, 	Energy_KW_Amount) VALUES (?,?,?,?,?,?,?,?)",
      [hash, adressTo, adressFrom, TimeWaiting, amount_Ether,amount_energyToken,DateTime,EnergyAmount],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  // create cpntract 
  app.post("/createContract", (req, res) => {
    const token = "0x778Da7f696e6fb15BBeb62d6C345f65cDD94eC2E";
    const seller= req.body.seller;
    const buyer = req.body.buyer
    const resvWallet= req.body.resvWallet;
    const timeWaiting= req.body.timeWaiting;
    const hashTX1= req.body.hashTX1;
    const mtTX1= req.body.mtTX1;
    const hashTX2= req.body.hashTX2;
    const mtTX2= req.body.mtTX2;
    const etat= req.body.etat;
    const date_crated= req.body.date_crated;
    const adress_contract=req.body.adress_contract;
  
    db.query(
      "INSERT INTO contract (token,seller,buyer,resvWallet,timeWaiting,hashTX1,mtTX1,hashTX2,mtTX2,etat,date_creation,adress_contract	) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [token,seller,buyer,resvWallet,timeWaiting,hashTX1,mtTX1,hashTX2,mtTX2,etat,date_crated,adress_contract],

      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });


  app.get("/get", (req, res) => {
   const sql ="SELECT * FROM transaction";
   db.query(sql, (err, result)=>{ 
    if (err) {console.log(err);}
    return res.json(result);
   });
  });


app.delete("/delete/:id", (req, res)=>{
  const sql ="DELETE  FROM transaction WHERE id_tx = ?";
  const id= req.params.id;
  db.query(sql, [id], (err, result)=>{ 
   if (err) {console.log(err);}
   return res.json(result);
  });})


  app.get("/read/:id", (req, res) => {
    const sql ="SELECT * FROM transaction WHERE adressTo LIKE ?";
    const adress = req.params.id;
    db.query(sql,[adress] ,(err, result)=>{ 
     if (err) {console.log(err);}
     return res.json(result);
    });
   });


   app.get("/readbyhash/:id", (req, res) => {
    const sql ="SELECT * FROM transaction WHERE hash LIKE ?";
    const adress = req.params.id;
    db.query(sql,[adress] ,(err, result)=>{ 
     if (err) {console.log(err);}
     return res.json(result);
    });
   });

  app.put("/update", (req , res)=>{
    const hash = req.body.hash;
    const newEtat = req.body.newEtat;
    if (!hash || !newEtat) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const sql = "UPDATE  transaction SET Etat = ? WHERE hash = ?";
    db.query(sql,[newEtat,hash] ,(err, result)=>{ 
      if (err) {console.log(err);}
      return res.json(result);
     });
  })


  app.put("/updateContract1", (req , res)=>{
    const transporter = req.body.transporter;
    const hashTX3 = req.body.hashTX3;
    const mtTX3 = req.body.mtTX3;
    const adress_contract = req.body.adress_contract;
   
    const sql = "UPDATE contract SET deliveryAdress = ?, hashTx3 = ?, mTx3 = ? WHERE adress_contract = ?";
    db.query(sql,[transporter,hashTX3,mtTX3,adress_contract] ,(err, result)=>{ 
      if (err) {console.log(err);}
      return res.json(result);
     });
  })
  
  app.get("/readContract/:deliveryAdress/:etat", (req, res) => {
    const sql = "SELECT * FROM contract WHERE deliveryAdress = ? AND etat = ?";
    const deliveryAdress = req.params.deliveryAdress;
    const etat = req.params.etat;
    db.query(sql, [deliveryAdress, etat], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(result);
    });
  });
  

  app.put("/UpdateDBrecuFromSeller", (req , res)=>{
    const ab = req.body.a;
   const yes ='Yes';
    const sql = "UPDATE contract SET recieveEnergyBySeller = ? WHERE adress_contract = ?";
    db.query(sql,[yes,ab] ,(err, result)=>{ 
      if (err) {console.log(err);}
      return res.json(result);
     });
  })
  app.put("/UpdateDBrecuFromSelle", (req , res)=>{
    const ab = req.body.a;
   const yes ='finish';
    const sql = "UPDATE contract SET etat = ? WHERE adress_contract = ?";
    db.query(sql,[yes,ab] ,(err, result)=>{ 
      if (err) {console.log(err);}
      return res.json(result);
     });
  })

  app.put("/Updatetx2finish", (req , res)=>{
    const  hashTx1_Finish= req.params.hashTx1_Finish;
    const adress_contract = req.params.adress_contract;
    const sql = "UPDATE contract SET hashTx1_Finish = ? WHERE adress_contract = ? ";
    db.query(sql,[hashTx1_Finish,adress_contract] ,(err, result)=>{ 
      if (err) {console.log(err);}
      return res.json(result);
     });
  })
  

   app.listen(3002, () => {
    console.log("Yey, your server is running on port 3001");
  });