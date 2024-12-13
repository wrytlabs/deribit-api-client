import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type AccountGetPortfolioMarginsParams = {
	currency: Currency;
	simulated_positions?: Record<string, number>;
};

// ---------------------------------------------------------------------------------------

export type AccountGetPortfolioMarginsResult = {
	vol_range: number[];
	vega_pow2: number;
	vega_pow1: number;
	skew: number;
	price_range: number;
	opt_sum_continguency: number;
	opt_continguency: number;
	kurtosis: number;
	int_rate: number;
	initial_margin_factor: number;
	ftu_continguency: number;
	atm_range: number;
	projected_margin_pos: number;
	projected_margin: number;
	position_sizes: Record<string, number>;
	pls: number[];
	pco_opt: number;
	pco_ftu: number;
	opt_summary: any[];
	opt_pls: number[];
	opt_entries: any[];
	margin_pos: number;
	margin: number;
	ftu_summary: AccountPortfolioMarginFtuSummary[];
	ftu_pls: number[];
	ftu_entries: AccountPortfolioMarginFtuEntry[];
	co_opt: number;
	co_ftu: number;
	calculation_timestamp: number;
};

export type AccountPortfolioMarginFtuSummary = {
	short_total_cost: number;
	pl_vec: number[];
	long_total_cost: number;
	exp_tstamp: number;
};

export type AccountPortfolioMarginFtuEntry = {
	total_cost: number;
	size: number;
	pl_vec: number[];
	mark_price: number;
	instrument_name: string;
	exp_tstamp: number;
};
