INSERT INTO public."OrderSummary"(
	"OrderSummaryId", "CustomerId", "TotalItems","TotalAmount", "AddedOn","OrderCounter","OrderNumber")
	VALUES (uuid_generate_v1(), $1, $2,$3,CURRENT_TIMESTAMP,$4,$5) RETURNING "OrderSummaryId";
