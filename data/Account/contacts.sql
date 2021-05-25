SElECT  c."ContactId",c."ContactName","PhoneNumber"
	FROM "Users" u 
	JOIN "Contacts" c ON c."ContactId" = u."UserId"
	WHERE c."UserId" = $1
    ORDER BY c."ContactName"
