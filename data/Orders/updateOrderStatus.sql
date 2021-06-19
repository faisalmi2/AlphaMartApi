
INSERT INTO public."OrderStatus"(
	 "OrderSummaryId", "StatusId", "AddedOn")
	VALUES ( $1, $2, CURRENT_TIMESTAMP);