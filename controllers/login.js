const { response } = require("express");
const mysql = require('mysql2') //npm install mysql2
const jwt = require('jsonwebtoken');
const os = require('os');
const requestIp = require("request-ip");
const axios = require('axios'); //npm install axios
const CompanyKey = '8103C443400C45BEB8C10F87DDA91B00';
const url = 'https://ex-api-demo-yy.568win.com';

require('dotenv').config()

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

// Register Agent
http://localhost:5001/SBO/web-root/restricted/agent/register-agent.aspx 
exports.Register_Agent = async (req, res) => {
  const Username = req.body.username;
  const Password = req.body.password;
  const Currency = req.body.currency;
  const Min = req.body.min;
  const Max = req.body.max;
  const MaxPerMatch = req.body.maxPerMatch;
  const CasinoTableLimit = req.body.casinoTableLimit;
  const ServerId = req.body.serverId;

  try {
    const restest = await axios.post(
      url + '	/web-root/restricted/agent/register-agent.aspx',
      {
        Username: "AgentDogzilla",
        Password: "dogzilla195",
        Currency: "USD",
        Min: 1,
        Max: 5000,
        MaxPerMatch: 20000,
        CasinoTableLimit: 1,
        CompanyKey: CompanyKey,
        ServerId: "dogzilla.live"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(restest.data)
  } catch (err) {
    console.log(err)
  }
};

//Update Agent Status
http://localhost:5001/SBO/web-root/restricted/agent/update-agent-status.aspx
exports.Update_Agent_Status = async (req, res) => {
  const Username = req.body.username;
  const Status = req.body.status;
  const CompanyKey = req.body.companyKey;
  const ServerId = req.body.serverId;

  const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${betPlay}' WHERE username ='${username}'`;
  try {
    connection.query(sql_update, (error, results) => {
      if (error) { console.log(error) }
      else {
        res.status(201).json({
          serverId: "568Win-TEST",
          error: {
            id: 0,
            msg: "No Error"
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

//Update Agent Preset Bet Setting-----------------------------------------------------------------------------------------------------------------------------
http://localhost:5000/SBO//web-root/restricted/agent/update-agent-preset-bet-settings.aspx
exports.Update_Agent_Preset_BetSetting = async (req, res) => {
  const Username = req.body.username;
  const Min = req.body.min;
  const Max = req.body.max;
  const MaxPerMatch = req.body.maxPerMatch;
  const CasinoTableLimit = req.body.casinoTableLimit;
  const CompanyKey = req.body.companyKey;
  const ServerId = req.body.serverId;

  const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${betPlay}' WHERE username ='${username}'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        res.status(201).json({
          serverId: "568Win-TEST",
          error: {
            id: 0,
            msg: "No Error"
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

//Register Player
http://localhost:5000/SBO/web-root/restricted/player/register-player.aspx 
exports.Register_Player = async (req, res) => {
  const Username = req.body.username;
  const UserGroup = req.body.usergroup;
  const Agent = req.body.agent;
  const ServerId = req.body.serverId;

  try {
    const restest = await axios.post(
      url + '/web-root/restricted/player/register-player.aspx',
      {
        Username: "ToontaPlayer",
        UserGroup: "a",
        Agent: "AgentDogzilla",
        CompanyKey: CompanyKey,
        ServerId: "dogzilla.live"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(restest.data)
  } catch (err) {
    console.log(err.response.data)
  }
};



http://localhost:5000/SBO/web-root/restricted/player/login.aspx
exports.Login_Player = async (req, res) => {
  const Username = req.body.username;
  const UserGroup = req.body.usergroup;
  const Agent = req.body.agent;
  const ServerId = req.body.serverId;
  const Portfolio = req.body.Portfolio;
  try {
    const restest = await axios.post(
      url + '/web-root/restricted/player/login.aspx',
      {
        Username: Username,
        Portfolio: Portfolio,
        IsWapSports: "false",
        CompanyKey: CompanyKey,
        ServerId: "dogzilla.live"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    res.status(201).json({
      linkGame: restest.data.url,
      message: 'TokenOn'
    });
    //console.log(restest.data)
  } catch (err) {
    console.log(err.response.data)
  }
};

http://localhost:5000/SBO/web-root/restricted/player/deposit.aspx
exports.Deposit_Player = async (req, res) => {
  const Username = req.body.username;
  const TxnId = req.body.TxnId;
  const Amount = req.body.Amount;
  const ServerId = req.body.serverId;

  try {
    const restest = await axios.post(
      url + '/web-root/restricted/player/deposit.aspx',
      {
        Username: Username,
        TxnId: TxnId,
        Amount: Amount,
        CompanyKey: CompanyKey,
        ServerId: "dogzilla.live"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    res.status(201).json({
      data: restest.data,
    });
    console.log(restest.data)
  } catch (err) {
    console.log(err.response.data)
  }
};

http://localhost:5000/SBO/web-root/restricted/player/get-player-balance.aspx
exports.Get_Player_Balance = async (req, res) => {
  const Username = req.body.username;
  try {
    const restest = await axios.post(
      url + '/web-root/restricted/player/get-player-balance.aspx',
      {
        Username: Username,
        CompanyKey: CompanyKey,
        ServerId: "dogzilla.live"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    res.status(201).json({
      data: restest.data,
    });
    //console.log(restest.data)
  } catch (err) {
    console.log(err.response.data)
  }
};

http://localhost:5000/post/bonus-win
exports.bonusPlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/jackpot-win
exports.JackpotPlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/transaction
exports.TransactionSlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/withdraw
exports.WithdrawSlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/deposit
exports.DepositSlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

//Askmebet-------------------------------------------------------------------------------------------------------------------------------------------------------------

http://localhost:5000/post/api/wallet/balance
exports.GetBalanceAsk = async (req, res) => {
  const agent = req.body.agent;
  const account = req.body.account;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          "status": 1,
          "balance": balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/api/wallet/bet
exports.PlaceBetAsk = async (req, res) => {
  const trans_id = req.body.trans_id;
  const agent = req.body.agent;
  const account = req.body.account;
  const game_id = req.body.game_id;
  const amount = req.body.amount;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              status: 1,
              trans_id: trans_id,
              balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/api/wallet/payout
exports.SettleBetAsk = async (req, res) => {
  const trans_id = req.body.trans_id;
  const agent = req.body.agent;
  const account = req.body.account;
  const game_id = req.body.game_id;
  const amount = req.body.amount;
  const authHeader = req.body.token;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE username ='${username}'`;
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              status: 1,
              trans_id: trans_id,
              balance: balanceNow
            });
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/api/wallet/cancel
exports.CancelBetAsk = async (req, res) => {
  const trans_id = req.body.trans_id;
  const agent = req.body.agent;
  const account = req.body.account;
  const game_id = req.body.game_id;
  username = 'member001';

  let spl = `SELECT credit FROM member WHERE username ='${username}' AND status_delete='N' 
  ORDER BY member_code ASC`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          status: 1,
          trans_id: trans_id,
          balance: balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};