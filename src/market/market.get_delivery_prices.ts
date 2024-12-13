// ---------------------------------------------------------------------------------------

export type MarketGetDeliveryPricesParams = {
	// Index identifier, matches (base) cryptocurrency with quote currency
	index_name: MarketGetDeliveryPricesNames;
	// The offset for pagination, default - 0
	offset?: number;
	// Number of requested items, default - 10
	count?: number;
};

// ---------------------------------------------------------------------------------------

export type MarketGetDeliveryPricesResult = {
	data: MarketGetDeliveryPricesData[];
	// Available delivery prices
	records_total: number;
};

type MarketGetDeliveryPricesData = {
	// The event date with year, month and day
	date: string;
	// The settlement price for the instrument. Only when state = closed
	delivery_price: number;
};

export enum MarketGetDeliveryPricesNames {
	ada_usd = 'ada_usd',
	algo_usd = 'algo_usd',
	avax_usd = 'avax_usd',
	bch_usd = 'bch_usd',
	btc_usd = 'btc_usd',
	doge_usd = 'doge_usd',
	dot_usd = 'dot_usd',
	eth_usd = 'eth_usd',
	link_usd = 'link_usd',
	ltc_usd = 'ltc_usd',
	matic_usd = 'matic_usd',
	near_usd = 'near_usd',
	shib_usd = 'shib_usd',
	sol_usd = 'sol_usd',
	trx_usd = 'trx_usd',
	uni_usd = 'uni_usd',
	usdc_usd = 'usdc_usd',
	xrp_usd = 'xrp_usd',
	ada_usdc = 'ada_usdc',
	bch_usdc = 'bch_usdc',
	algo_usdc = 'algo_usdc',
	avax_usdc = 'avax_usdc',
	btc_usdc = 'btc_usdc',
	doge_usdc = 'doge_usdc',
	dot_usdc = 'dot_usdc',
	eth_usdc = 'eth_usdc',
	link_usdc = 'link_usdc',
	ltc_usdc = 'ltc_usdc',
	matic_usdc = 'matic_usdc',
	near_usdc = 'near_usdc',
	shib_usdc = 'shib_usdc',
	sol_usdc = 'sol_usdc',
	trx_usdc = 'trx_usdc',
	uni_usdc = 'uni_usdc',
	xrp_usdc = 'xrp_usdc',
	ada_usdt = 'ada_usdt',
	algo_usdt = 'algo_usdt',
	avax_usdt = 'avax_usdt',
	bch_usdt = 'bch_usdt',
	bnb_usdt = 'bnb_usdt',
	btc_usdt = 'btc_usdt',
	doge_usdt = 'doge_usdt',
	dot_usdt = 'dot_usdt',
	eth_usdt = 'eth_usdt',
	link_usdt = 'link_usdt',
	ltc_usdt = 'ltc_usdt',
	luna_usdt = 'luna_usdt',
	matic_usdt = 'matic_usdt',
	near_usdt = 'near_usdt',
	shib_usdt = 'shib_usdt',
	sol_usdt = 'sol_usdt',
	trx_usdt = 'trx_usdt',
	uni_usdt = 'uni_usdt',
	xrp_usdt = 'xrp_usdt',
	btcdvol_usdc = 'btcdvol_usdc',
	ethdvol_usdc = 'ethdvol_usdc',
}
