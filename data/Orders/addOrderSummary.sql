INSERT INTO public."OrderSummary"(
	"OrderSummaryId", "CustomerId", "TotalItems","TotalAmount", "AddedOn")
	VALUES (uuid_generate_v1(), $1, $2,$3,CURRENT_TIMESTAMP) RETURNING "OrderSummaryId";
