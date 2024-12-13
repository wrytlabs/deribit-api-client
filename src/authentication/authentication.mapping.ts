import { DeribitApiClient } from '../client/client';
import { RequestQuery } from '../client/client.types';
import { ApiPublicAuthParams, ApiPublicAuthResult } from './public.auth';

export class AuthenticationMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async auth(
		params: ApiPublicAuthParams,
		modifier?: ((data: RequestQuery<ApiPublicAuthResult>) => any) | undefined
	): Promise<RequestQuery<ApiPublicAuthResult>> {
		return await this.client.send<ApiPublicAuthParams, ApiPublicAuthResult>('/public/auth', params, modifier);
	}
}
