SELECT "UserId", "PhoneNumber", "Password"
	FROM "Users"
	WHERE "PhoneNumber" = $1;