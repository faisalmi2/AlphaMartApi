UPDATE  "AppUsers"
SET "IsApproved"=$2
WHERE "UserId" = $1;