SELECT "UserId", "PhoneNumber", "Email", "Password"
	FROM "AppUsers"
	WHERE "PhoneNumber" = $1;