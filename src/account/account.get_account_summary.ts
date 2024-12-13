import { AccountLimits, ApiLimit, RateLimit } from '../client/client.types';
import { Currency } from '../client/general.types';

export type GetAccountSummaryParams = {
	currency: Currency;
	subaccount_id?: number;
	extended?: boolean;
};

export type GetAccountSummaryResult = {
	portfolio_margining_enabled: boolean;
	balance: number;
	options_theta_map: Record<string, number>;
	margin_model: string;
	equity: number;
	spot_reserve: number;
	total_pl: number;
	estimated_liquidation_ratio: number;
	session_upl: number;
	maintenance_margin: number;
	locked_balance: number;
	fee_balance: number;
	limits: AccountLimits;
	estimated_liquidation_ratio_map: Record<string, number>;
	projected_delta_total: number;
	futures_session_rpl: number;
	futures_pl: number;
	options_session_upl: number;
	options_value: number;
	currency: string;
	options_gamma_map: Record<string, number>;
	available_funds: number;
	available_withdrawal_funds: number;
	projected_initial_margin: number;
	projected_maintenance_margin: number;
	additional_reserve: number;
	margin_balance: number;
	options_gamma: number;
	change_margin_model_api_limit: ApiLimit;
	options_vega_map: Record<string, number>;
	delta_total_map: Record<string, number>;
	cross_collateral_enabled: boolean;
	options_session_rpl: number;
	options_theta: number;
	futures_session_upl: number;
	options_delta: number;
	initial_margin: number;
	session_rpl: number;
	delta_total: number;
	options_vega: number;
	options_pl: number;
	deposit_address?: string;
	fees?: AccountFee[];
	id?: number;
	email?: string;
	username?: string;
	type?: string;
	system_name?: string;
	creation_timestamp?: number;
	login_enabled?: boolean;
	interuser_transfers_enabled?: boolean;
	mmp_enabled?: boolean;
	security_keys_enabled?: boolean;
	self_trading_extended_to_subaccounts?: boolean;
	self_trading_reject_mode?: string;
	referrer_id?: string;
	has_non_block_chain_equity?: boolean;
	total_initial_margin_usd?: number;
	total_equity_usd?: number;
	total_maintenance_margin_usd?: number;
	total_margin_balance_usd?: number;
	total_delta_total_usd?: number;
};

export type AccountFee = {
	currency: string;
	fee_type: 'relative' | 'fixed';
	instrument_type: 'future' | 'perpetual' | 'option';
	maker_fee: number;
	taker_fee: number;
};