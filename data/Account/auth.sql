SELECT "UserId", "PhoneNumber", "Email", "Password", "RoleId","FullName"
	FROM "AppUsers"
	WHERE "PhoneNumber" = $1;