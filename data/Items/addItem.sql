INSERT INTO public."Items"(
	 "ItemName", "UnitId", "Quantity", "CostPrice", "ActualPrice", "SellingPrice", "ItemCategoryId"
     , "IsActive", "AddedBy", "AddedOn","FileExtension")
	VALUES ($1, $2, $3, $4, $5, $6,  $7, $8, $9, NOW(),$10) RETURNING "ItemId";
