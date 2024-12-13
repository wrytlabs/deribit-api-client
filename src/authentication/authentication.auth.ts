import { DeribitApiGrantType } from '../client/client.types';

export type ApiAuthenticationAuthParams = {
	grant_type: DeribitApiGrantType.client_credentials;
	client_id: string;
	client_secret: string;
};

export type ApiAuthenticationAuthResult = {
	access_token: string;
	enabled_features: string[];
	expires_in: string;
	refresh_token: string;
	scope: string;
	sid: string;
	state: string;
	token_type: string;
};
