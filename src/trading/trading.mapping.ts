import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';

export class TradingMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}
}
