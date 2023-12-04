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



//SlotXO-------------------------------------------------------------------------------------------------------------------------------------------------------------------
http://localhost:5000/post/authenticate-token 
exports.authenticate = async (req, res) => {
  const authHeader = req.body.token;
  const ip = req.body.ip;
  const timestamp = req.body.timestamp;

  let spl = `SELECT credit, username FROM member WHERE tokenplaygame ='${authHeader}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          Status: 0,
          Message: "Success",
          Username: results[0].username,
          Balance: 10000
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/balance 
exports.balanceXO = async (req, res) => {
  const timestamp = req.body.timestamp;
  const usernameGame = req.body.username;
  username = 'member001';
  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          Status: 0,
          Message: "Success",
          Username: usernameGame,
          Balance: balanceUser
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/bet 
exports.PlaceBetSlotXo = async (req, res) => {
  const id = req.body.id;
  const amount = req.body.amount;
  const timestamp = req.body.timestamp;
  const roundid = req.body.roundid;
  const usernameGame = req.body.username;
  const gamecode = req.body.gamecode;
  const userAgent = req.headers['user-agent'];

  let spl = `SELECT credit, turnover, gameplayturn FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        let postTurnover = results[0].turnover - amount;
        if (postTurnover < 0) { postTurnover = 0; }
        const post = {
          username: usernameGame, gameid: "SLOTXO", bet: amount, win: 0, balance_credit: balanceNow, userAgent: userAgent, platform: userAgent, trans_id: roundid
        }
        let balanceturnover = hasSimilarData(results[0].gameplayturn, "SLOTXO", results[0].turnover, amount)

        let repost = repostGame.uploadLogRepostGameAsk(post)
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}', turnover='${balanceturnover}'
        WHERE phonenumber ='${usernameGame}'`;
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

http://localhost:5000/post/settle-bet 
exports.SettlePlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;
  const gamecode = req.body.gamecode;
  const userAgent = req.headers['user-agent'];
  const timestamp = req.body.timestamp;
  const roundid = req.body.roundid;

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const post = {
          username: usernameGame, gameid: "SLOTXO", bet: 0, win: amount, balance_credit: balanceNow, userAgent: userAgent, platform: userAgent, trans_id: roundid
        }
        let repost = repostGame.uploadLogRepostGameAsk(post)
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE phonenumber ='${usernameGame}'`;
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

http://localhost:5000/post/cancel-bet
exports.CancelPlaySlotXo = async (req, res) => {
  const usernameGame = req.body.username;

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        connection.query(sql_update, (error, resultsGame) => {
          if (error) { console.log(error) }
          else {
            res.status(201).json({
              Status: 0,
              Message: "Success",
              Username: usernameGame,
              Balance: balanceUser
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

http://localhost:5000/post/bonus-win
exports.bonusPlaySlotXo = async (req, res) => {
  const amount = req.body.amount;
  const usernameGame = req.body.username;

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE phonenumber ='${usernameGame}'`;
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

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE username ='${usernameGame}'`;
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

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser;
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${amount}' WHERE phonenumber ='${usernameGame}'`;
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
  const id = req.body.id;
  const amount = req.body.amount;
  const timestamp = req.body.timestamp;
  const roundid = req.body.roundid;
  const usernameGame = req.body.username;
  const gamecode = req.body.gamecode;
  const userAgent = req.headers['user-agent'];

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser - amount;
        const post = {
          username: usernameGame, gameid: "SLOTXO", bet: amount, win: 0, balance_credit: balanceNow, userAgent: userAgent, platform: userAgent, trans_id: timestamp
        }
        let repost = repostGame.uploadLogRepostGameAsk(post)
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE phonenumber ='${usernameGame}'`;
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
  const id = req.body.id;
  const amount = req.body.amount;
  const timestamp = req.body.timestamp;
  const roundid = req.body.roundid;
  const usernameGame = req.body.username;
  const gamecode = req.body.gamecode;
  const userAgent = req.headers['user-agent'];

  let spl = `SELECT credit FROM member WHERE phonenumber ='${usernameGame}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        const balanceNow = balanceUser + amount;
        const post = {
          username: usernameGame, gameid: "SLOTXO", bet: 0, win: amount, balance_credit: balanceNow, userAgent: userAgent, platform: userAgent, trans_id: timestamp
        }
        let repost = repostGame.uploadLogRepostGameAsk(post)
        const sql_update = `UPDATE member set credit='${balanceNow}',bet_latest='${0}' WHERE phonenumber ='${usernameGame}'`;
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

http://localhost:5000/post/authenticate
exports.MobileauthenticateXoJo = async (req, res) => {
  const password = req.body.password;
  const ip = req.body.ip;
  const timestamp = req.body.timestamp;
  const userUsername = username
  let username = 'member001';
  const token = jwt.sign(
    {
      userUsername: userUsername,
      password: password,
      timestamp: timestamp,
      ip: ip
    },
    'secretfortoken',
    { expiresIn: '48h' }
  );
  let spl = `SELECT credit FROM member WHERE phonenumber ='${userUsername}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          Status: 0,
          Token: token,
          Balance: balanceUser,
          Message: "Success",
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};

http://localhost:5000/post/seamless/getAppUsername
exports.GetMobileauthenticateXoJo = async (req, res) => {
  const productId = req.body.productId;
  const password = req.body.password;
  const userUsername = req.body.username
  let username = 'member001';
  let spl = `SELECT credit FROM member WHERE phonenumber ='${userUsername}' AND status_delete='N'`;
  try {
    connection.query(spl, (error, results) => {
      if (error) { console.log(error) }
      else {
        const balanceUser = parseFloat(results[0].credit);
        res.status(201).json({
          reqId: "f47e5065-412c-40d1-9e4c-f6c248919509",
          code: 0,
          message: "Success",
          data: {
            applicationUsername: "TFY1.001CJE2WC"
          }
        });
      }
    })
  } catch (err) {
    err.statusCode = 500;
    res.json({ status: "Not Data Request Body." });
  }
};