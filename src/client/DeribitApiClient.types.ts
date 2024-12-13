export enum DeribitApiGrantType {
	client_public = 'client_public',
	client_credentials = 'client_credentials',
	client_signature = 'client_signature',
	refresh_token = 'refresh_token',
}

// ---------------------------------------------------------------------------------------

export type DeribitApiClientOptions = DeribitApiClientPublicOptions | DeribitApiClientCredentialsOptions;

export type DeribitApiClientPublicOptions = {
	type: DeribitApiGrantType.client_public;
	baseUrl: string;
};

export type DeribitApiClientCredentialsOptions = {
	type: DeribitApiGrantType.client_credentials;
	baseUrl: string;
	clientId: string;
	clientSecret: string;
};

// ---------------------------------------------------------------------------------------

export type RequestQuery<ApiResult> = RequestQueryReceived<ApiResult> | RequestQueryError;

export type RequestQueryReceived<ApiResult> = {
	jsonrpc: `${number}.${number}`;
	id: number;
	result: ApiResult;
	testnet: boolean;
	usDiff: number;
	usIn: number;
	usOut: number;
};

export type RequestQueryError = {
	jsonrpc: `${number}.${number}`;
	id: number;
	error: {
		code: number;
		message: string;
	};
	testnet: boolean;
	usDiff: number;
	usIn: number;
	usOut: number;
};
