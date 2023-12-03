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
module.exports = router;