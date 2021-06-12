INSERT INTO public."AppUsers"(
	"UserId", "PhoneNumber",  "Password","Email", "RoleId", "FullName")
	VALUES (uuid_generate_v1(), $1, $2, $3, $4, $5)  RETURNING "UserId";
