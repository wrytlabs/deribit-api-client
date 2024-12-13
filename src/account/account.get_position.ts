export type GetPositionParams = {
	instrument_name: string;
};

export type GetPositionResult = GetPositionResultAll | GetPositionResultOption;

export type GetPositionResultAll = {
	average_price: number;
	average_price_usd: number;
	delta: number;
	direction: GetPositionDirection;
	estimated_liquidation_price: number;
	floating_profit_loss: number;
	floating_profit_loss_usd: number;
	gamma: number;
	index_price: number;
	initial_margin: number;
	instrument_name: string;
	interest_value: number;
	kind: GetInstrumentKind;
	leverage: number;
	maintenance_margin: number;
	mark_price: number;
	open_orders_margin: number;
	realized_funding: number;
	realized_profit_loss: number;
	settlement_price: number;
	size: number;
	size_currency: number;
	theta: number;
	total_profit_loss: number;
	vega: number;
};

export type GetPositionResultOption = {
	average_price: number;
	average_price_usd: number;
	delta: number;
	direction: GetPositionDirection;
	floating_profit_loss: number;
	floating_profit_loss_usd: number;
	gamma: number;
	index_price: number;
	initial_margin: number;
	instrument_name: string;
	kind: GetInstrumentKind.option;
	maintenance_margin: number;
	mark_price: number;
	realized_profit_loss: number;
	settlement_price: number;
	size: number;
	theta: number;
	total_profit_loss: number;
	vega: number;
};

export enum GetPositionDirection {
	buy = 'buy',
	sell = 'sell',
	zero = 'zero',
}

export enum GetInstrumentKind {
	future = 'future',
	option = 'option',
	spot = 'spot',
	future_combo = 'future_combo',
	option_combo = 'option_combo',
}
