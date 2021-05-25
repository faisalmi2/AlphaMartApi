'use strict';

const express =require('express');
const ConversationController = require('../controllers/ConversationsController');
const router= express.Router();

const {AddConversation,GetConversations} = ConversationController;

router.get('/Conversations',GetConversations);
router.post('/Conversations/Add',AddConversation);

module.exports={
    routes:router
}