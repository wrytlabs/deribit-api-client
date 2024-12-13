// ---------------------------------------------------------------------------------------

export type MarketGetCurrenciesParams = Record<string, never>;

// ---------------------------------------------------------------------------------------

export type MarketGetCurrenciesResult = {
	// The type of the currency
	coin_type: string;
	// The abbreviation of the currency. This abbreviation is used elsewhere in the API to identify the currency
	currency: string;
	// The full name for the currency
	currency_long: string;
	// Fee precision
	fee_precision: number;
	// True if the currency is part of the cross collateral pool
	in_cross_collateral_pool: boolean;
	// Minimum number of block chain confirmations before deposit is accepted
	min_confirmations: number;
	// The minimum transaction fee paid for withdrawals
	min_withdrawal_fee: number;
	// The total transaction fee paid for withdrawals
	withdrawal_fee: number;
	// Withdrawal priorities configuration
	withdrawal_priorities: WithdrawalPriority[];
};

type WithdrawalPriority = {
	// Priority name
	name: string;
	// Priority value
	value: number;
};
