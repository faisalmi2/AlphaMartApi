SELECT "UserId", "PhoneNumber", "Email", "Password", "RoleId","FullName","IsApproved"
	FROM "AppUsers"
	WHERE "PhoneNumber" = $1;