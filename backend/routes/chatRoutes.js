const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {accesChat,fetchChats} = require('../controller/chatController')
const router = express.Router();

router.route('/').post(protect,accesChat);
router.route('/').get(protect,fetchChats);
// router.route('/group').post(protect,createGroupChat);
// router.route('/rename').put(protect,renameChat);
// router.route('/groupRemove').post(protect,removeFromGroup);
// router.route('/groupAdd').post(protect,addToGroup);

module.exports = router;