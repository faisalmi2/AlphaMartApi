
SELECT o."OrderSummaryId",o."CustomerId",o."TotalItems",o."TotalAmount","OrderNumber",o."AddedOn",ols."StatusId",ols."StatusName",array_to_json(array_agg(oi)) OrderedItems 
FROM "OrderSummary" o
JOIN vwlatestorderstatus ols ON ols."OrderSummaryId" = o."OrderSummaryId"
JOIN (SELECT oi.*,i."FileExtension" FROM "OrderedItems" oi JOIN "Items" i ON i."ItemId"=oi."ItemId") oi ON oi."OrderSummaryId" = o."OrderSummaryId"
WHERE o."AssignedSalepersonId" = $1 AND ols."StatusId" = $2 --not equal to delivered
GROUP BY  o."OrderSummaryId",o."CustomerId",o."TotalItems",o."TotalAmount",o."AddedOn",ols."StatusId",ols."StatusName"