
INSERT INTO public."OrderStatus"(
	 "OrderSummaryId", "StatusId", "Added On")
	VALUES ( $1, $2, CURRENT_TIMESTAMP);