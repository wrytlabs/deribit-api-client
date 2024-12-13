import { GrantType } from '../client/client.types';

export type AuthenticationAuthParams = {
	grant_type: GrantType.client_credentials;
	client_id: string;
	client_secret: string;
};

export type AuthenticationAuthResult = {
	access_token: string;
	enabled_features: string[];
	expires_in: string;
	refresh_token: string;
	scope: string;
	sid: string;
	state: string;
	token_type: string;
};
