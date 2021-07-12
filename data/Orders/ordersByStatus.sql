
SELECT o."OrderSummaryId",o."CustomerId",u."FullName" as "CustomerName",o."TotalItems",o."TotalAmount",o."AssignedSalepersonId","OrderNumber",o."AddedOn",ols."StatusName",array_to_json(array_agg(oi)) OrderedItems FROM "OrderSummary" o
JOIN vwlatestorderstatus ols ON ols."OrderSummaryId" = o."OrderSummaryId"
JOIN "OrderedItems" oi ON oi."OrderSummaryId" = o."OrderSummaryId"
JOIN "AppUsers" u ON u."UserId"=o."CustomerId"
WHERE  ols."StatusId" = $1 
GROUP BY  o."OrderSummaryId",o."CustomerId",u."FullName" ,o."TotalItems",o."TotalAmount",o."AddedOn",ols."StatusName"