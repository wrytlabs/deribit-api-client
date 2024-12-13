import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { AuthenticationAuthParams, AuthenticationAuthResult } from './authentication.auth';

export class AuthenticationMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async auth<Modifier = RequestQuery<AuthenticationAuthResult>>(
		params: AuthenticationAuthParams,
		modifier?: ((data: RequestQuery<AuthenticationAuthResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<AuthenticationAuthParams, AuthenticationAuthResult, Modifier>(
			'/public/auth',
			undefined,
			params,
			modifier
		);
	}
}
