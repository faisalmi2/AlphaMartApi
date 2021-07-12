
SELECT o."OrderSummaryId",o."CustomerId",o."TotalItems",o."TotalAmount","OrderNumber",o."AddedOn",ols."StatusName",array_to_json(array_agg(oi)) OrderedItems FROM "OrderSummary" o
JOIN vwlatestorderstatus ols ON ols."OrderSummaryId" = o."OrderSummaryId"
JOIN "OrderedItems" oi ON oi."OrderSummaryId" = o."OrderSummaryId"
WHERE o."CustomerId" = $1 AND ols."StatusId" != 4 --not equal to delivered
GROUP BY  o."OrderSummaryId",o."CustomerId",o."TotalItems",o."TotalAmount",o."AddedOn",ols."StatusName"