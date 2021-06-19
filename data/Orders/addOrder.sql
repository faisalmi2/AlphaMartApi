INSERT INTO public."OrderedItems"(
	"OrderItemId", "OrderSummaryId", "ItemId", "ItemName", "CountryName", "SellingPrice", "UnitName", "OrderedQuantity", "CategoryName", "TotalPrice")
	VALUES (uuid_generate_v1(), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "OrderItemId";