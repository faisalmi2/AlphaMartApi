INSERT INTO "Conversations"(
	 "ConversationId","SenderId", "ReceiverId", "Message", "AddedOn")
	VALUES (uuid_generate_v1(),$1, $2, $3,current_timestamp)  RETURNING "ConversationId", "SenderId", "ReceiverId", "Message", "AddedOn"; 