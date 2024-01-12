const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {accesChat,fetchChats,createGroupChat,renameChat,addToGroup,removeFromGroup} = require('../controller/chatController')
const router = express.Router();

router.route('/').post(protect,accesChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameChat);
router.route('/groupRemove').put(protect,removeFromGroup);
router.route('/groupAdd').put(protect,addToGroup);

module.exports = router;