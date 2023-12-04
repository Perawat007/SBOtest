const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const post = require('../middleware/post');

router.post('/token', post);

router.post('/web-root/restricted/agent/register-agent.aspx', loginController.Register_Agent)
router.post('/web-root/restricted/player/register-player.aspx', loginController.Register_Player)
router.post('/web-root/restricted/player/login.aspx', loginController.Login_Player)
router.post('/web-root/restricted/player/deposit.aspx', loginController.Deposit_Player)
router.post('/web-root/restricted/player/get-player-balance.aspx', loginController.Get_Player_Balance)

//SlotXO
router.post('/joslot/authenticate-token', loginController.authenticate)
router.post('/joslot/balance', loginController.balanceXO)
router.post('/joslot/bet', loginController.PlaceBetSlotXo)
router.post('/joslot/settle-bet', loginController.SettlePlaySlotXo)
router.post('/joslot/cancel-bet', loginController.CancelPlaySlotXo)
router.post('/joslot/bonus-win', loginController.bonusPlaySlotXo)
router.post('/joslot/jackpot-win', loginController.JackpotPlaySlotXo)
router.post('/joslot/transaction', loginController.TransactionSlotXo)
router.post('/joslot/withdraw', loginController.WithdrawSlotXo)
router.post('/joslot/deposit', loginController.DepositSlotXo)
router.post('/joslot/authenticate', loginController.MobileauthenticateXoJo)
router.post('/joslot/seamless/getAppUsername', loginController.GetMobileauthenticateXoJo)
//SlotXO

module.exports = router;