import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import {
	MarketGetBookSummaryByCurrencyParams,
	MarketGetBookSummaryByCurrencyResult,
} from './market.get_book_summary_by_currency';
import {
	MarketGetBookSummaryByInstrumentParams,
	MarketGetBookSummaryByInstrumentResult,
} from './market.get_book_summary_by_instrument';
import { MarketGetCurrenciesParams, MarketGetCurrenciesResult } from './market.get_currencies';
import { MarketGetDeliveryPricesParams, MarketGetDeliveryPricesResult } from './market.get_delivery_prices';

export class MarketMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async getBookSummaryByCurrency<Modifier = RequestQuery<MarketGetBookSummaryByCurrencyResult>>(
		params: MarketGetBookSummaryByCurrencyParams,
		modifier?: ((data: RequestQuery<MarketGetBookSummaryByCurrencyResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<
			MarketGetBookSummaryByCurrencyParams,
			MarketGetBookSummaryByCurrencyResult,
			Modifier
		>('/public/get_book_summary_by_currency', [], params, modifier);
	}

	public async getBookSummaryByInstrument<Modifier = RequestQuery<MarketGetBookSummaryByInstrumentResult>>(
		params: MarketGetBookSummaryByInstrumentParams,
		modifier?: ((data: RequestQuery<MarketGetBookSummaryByInstrumentResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<
			MarketGetBookSummaryByInstrumentParams,
			MarketGetBookSummaryByInstrumentResult,
			Modifier
		>('/public/get_book_summary_by_instrument', [], params, modifier);
	}

	public async getCurrencies<Modifier = RequestQuery<MarketGetCurrenciesResult>>(
		params: MarketGetCurrenciesParams,
		modifier?: ((data: RequestQuery<MarketGetCurrenciesResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<MarketGetCurrenciesParams, MarketGetCurrenciesResult, Modifier>(
			'/public/get_currencies',
			[],
			params,
			modifier
		);
	}

	public async getDeliveryPrices<Modifier = RequestQuery<MarketGetDeliveryPricesResult>>(
		params: MarketGetDeliveryPricesParams,
		modifier?: ((data: RequestQuery<MarketGetDeliveryPricesResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<MarketGetDeliveryPricesParams, MarketGetDeliveryPricesResult, Modifier>(
			'/public/get_delivery_prices',
			[],
			params,
			modifier
		);
	}
}
