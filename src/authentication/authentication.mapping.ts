import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { ApiAuthenticationAuthParams, ApiAuthenticationAuthResult } from './authentication.auth';

export class AuthenticationMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async auth(
		params: ApiAuthenticationAuthParams,
		modifier?: ((data: RequestQuery<ApiAuthenticationAuthResult>) => any) | undefined
	): Promise<RequestQuery<ApiAuthenticationAuthResult>> {
		return await this.client.send<ApiAuthenticationAuthParams, ApiAuthenticationAuthResult>('/public/auth', params, modifier);
	}
}
