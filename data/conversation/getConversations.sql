WITH    
    pageSize AS (VALUES ($3::INTEGER))
	
SELECT "ConversationId", "SenderId",receivercontacts."ContactName" "SenderName", "ReceiverId", "Message", s."AddedOn"
	FROM "Conversations" as s
	LEFT JOIN "Contacts" as receivercontacts ON receivercontacts."ContactId" = s."SenderId"
	WHERE ("ReceiverId" =$1 AND "SenderId"=$2)
 	OR ("ReceiverId" = $2 AND "SenderId"=$1)
	ORDER BY s."AddedOn" DESC
    
	OFFSET  (table pageSize) ROWS 

	FETCH FIRST 15 ROW ONLY; 

	

	

-- WITH    
--     pageSize AS (VALUES ($3::INTEGER))
	

-- SELECT "ConversationId", "SenderId", "SenderName", "ReceiverId", "Message", "AddedOn" FROM
-- (SELECT "ConversationId", "SenderId",receivercontacts."ContactName" "SenderName", "ReceiverId", "Message", s."AddedOn"
-- 	FROM "Conversations" as s
-- 	LEFT JOIN "Contacts" as receivercontacts ON receivercontacts."ContactId" = s."SenderId"
-- 	WHERE ("ReceiverId" =$1 AND "SenderId"=$2)
-- 	OR ("ReceiverId" = $2 AND "SenderId"=$1)
-- 	ORDER BY s."AddedOn" DESC
--     limit (table pageSize)*10
-- )main	ORDER BY "AddedOn" asc
-- --limit 10
-- --OFFSET pageSize*10 

-- FETCH FIRST 5 ROW ONLY; 

	