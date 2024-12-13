import { DeribitApiClient } from '../client/DeribitApiClient';
import { RequestQuery } from '../client/DeribitApiClient.types';
import { ApiPublicAuthParams, ApiPublicAuthResult } from './public.auth';

export class PublicMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	async auth(
		params: ApiPublicAuthParams,
		modifier?: ((data: RequestQuery<ApiPublicAuthResult>) => any) | undefined
	): Promise<RequestQuery<ApiPublicAuthResult>> {
		return await this.client.send<ApiPublicAuthParams, ApiPublicAuthResult>('/public/auth', params, modifier);
	}
}
