import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { AuthenticationAuthParams, AuthenticationAuthResult } from './authentication.auth';

export class AuthenticationMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async auth(
		params: AuthenticationAuthParams,
		modifier?: ((data: RequestQuery<AuthenticationAuthResult>) => any) | undefined
	): Promise<RequestQuery<AuthenticationAuthResult>> {
		return await this.client.send<AuthenticationAuthParams, AuthenticationAuthResult>(
			'/public/auth',
			params,
			modifier
		);
	}
}
