SELECT "UserId", "PhoneNumber", "Email", "Password","RoleId","IsApproved","FullName"
	FROM "AppUsers" WHERE "RoleId" = (CASE WHEN  $1=-1 THEN "RoleId" ELSE $1 END) AND "RoleId" != 4
	ORDER BY "UserId";