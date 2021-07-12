SELECT "UserId", "PhoneNumber", "Email", "Password","RoleId","IsApproved","FullName"
	FROM "AppUsers" WHERE  "RoleId" = 4
	ORDER BY "IsApproved","UserId";;