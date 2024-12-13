import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type MarketGetBookSummaryByCurrencyParams = {
	// The currency symbol (BTC, ETH, USDC, USDT, EURR)
	currency: Currency;
	// Instrument kind, if not provided instruments of all kinds are considered
	kind?: InstrumentKind;
};

// ---------------------------------------------------------------------------------------

export type MarketGetBookSummaryByCurrencyResult = {
	// The current best ask price, null if there aren't any asks
	ask_price: number | null;
	// Base currency
	base_currency: string;
	// The current best bid price, null if there aren't any bids
	bid_price: number | null;
	// The timestamp (milliseconds since the Unix epoch)
	creation_timestamp: number;
	// Current funding (perpetual only)
	current_funding: number;
	// Optional (only for derivatives). Estimated delivery price for the market
	estimated_delivery_price?: number;
	// Funding 8h (perpetual only)
	funding_8h: number;
	// Price of the 24h highest trade
	high: number;
	// Unique instrument identifier
	instrument_name: string;
	// Interest rate used in implied volatility calculations (options only)
	interest_rate: number;
	// The price of the latest trade, null if there weren't any trades
	last: number | null;
	// Price of the 24h lowest trade, null if there weren't any trades
	low: number | null;
	// (Only for option) implied volatility for mark price
	mark_iv: number;
	// The current instrument market price
	mark_price: number;
	// The average of the best bid and ask, null if there aren't any asks or bids
	mid_price: number | null;
	// Optional (only for derivatives). The total amount of outstanding contracts in the corresponding amount units
	open_interest: number;
	// 24-hour price change expressed as a percentage, null if there weren't any trades
	price_change: number | null;
	// Quote currency
	quote_currency: string;
	// Name of the underlying future, or 'index_price' (options only)
	underlying_index: string;
	// underlying price for implied volatility calculations (options only)
	underlying_price: number;
	// The total 24h traded volume (in base currency)
	volume: number;
	// Volume in quote currency (futures and spots only)
	volume_notional: number;
	// Volume in USD
	volume_usd: number;
};

export enum InstrumentKind {
	// Future instruments
	future = 'future',
	// Option instruments
	option = 'option',
	// Spot instruments
	spot = 'spot',
	// Future combo instruments
	future_combo = 'future_combo',
	// Option combo instruments
	option_combo = 'option_combo',
}
