import { WebSocketGrantType } from '../client/WebSocketClient.types';

export type ApiPublicAuthParams = {
	grant_type: WebSocketGrantType.client_credentials;
	client_id: string;
	client_secret: string;
};

export type ApiPublicAuthResult = {
	access_token: string;
	enabled_features: string[];
	expires_in: string;
	refresh_token: string;
	scope: string;
	sid: string;
	state: string;
	token_type: string;
};

export type ApiPublicAuthFunction = (params: ApiPublicAuthParams) => ApiPublicAuthResult;
