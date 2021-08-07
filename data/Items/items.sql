SELECT "ItemId", "ItemName", i."UnitId",u."UnitName", "Quantity", "CostPrice", "ActualPrice",
 "SellingPrice", i."ItemCategoryId",ic."ItemCategoryName", i."IsActive",'India' "CountryName","FileExtension"
	FROM "Items" i
	JOIN "Units" u ON u."UnitId" = i."UnitId"
	JOIN "ItemCategories" ic ON ic."ItemCategoryId" = i."ItemCategoryId" AND ic."IsActive"=true
	WHERE i."IsActive" = true 
	AND i."ItemCategoryId" = (CASE WHEN  $1=-1 THEN i."ItemCategoryId" ELSE $1 END) AND REPLACE("ItemName",' ','') like $2
	ORDER BY "ItemId"