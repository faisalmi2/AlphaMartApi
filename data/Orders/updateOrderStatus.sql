
INSERT INTO public."OrderStatus"(
	 "OrderSummaryId", "StatusId", "AddedOn","AddedBy")
	VALUES ( $1, $2, CURRENT_TIMESTAMP,$3);