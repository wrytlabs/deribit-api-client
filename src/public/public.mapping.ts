import { WebSocketClient } from '../client/WebSocketClient';
import { RequestQuery } from '../client/WebSocketClient.types';
import { ApiPublicAuthParams, ApiPublicAuthResult } from './public.auth';

export class PublicMapping {
	private readonly client: WebSocketClient;

	constructor(_connector: WebSocketClient) {
		this.client = _connector;
	}

	async auth(
		params: ApiPublicAuthParams,
		modifier?: ((data: RequestQuery<ApiPublicAuthResult>) => any) | undefined
	): Promise<RequestQuery<ApiPublicAuthResult>> {
		return await this.client.send<ApiPublicAuthParams, ApiPublicAuthResult>('/public/auth', params, modifier);
	}
}
