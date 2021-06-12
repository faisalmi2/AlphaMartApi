SELECT "ItemId", "ItemName", i."UnitId",u."UnitName", "Quantity", "CostPrice", "ActualPrice",
 "SellingPrice", i."ItemCategoryId",ic."ItemCategoryName", i."IsActive",'India' "CountryName"
	FROM "Items" i
	JOIN "Units" u ON u."UnitId" = i."UnitId"
	JOIN "ItemCategories" ic ON ic."ItemCategoryId" = i."ItemCategoryId" AND ic."IsActive"=true
	WHERE i."IsActive" = true
	ORDER BY "ItemId"