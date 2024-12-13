export enum GrantType {
	client_public = 'client_public',
	client_credentials = 'client_credentials',
	client_signature = 'client_signature',
	refresh_token = 'refresh_token',
}

// ---------------------------------------------------------------------------------------

export type ClientOptions = ClientPublicOptions | ClientCredentialsOptions;

export type ClientPublicOptions = {
	type: GrantType.client_public;
	baseUrl: string;
};

export type ClientCredentialsOptions = {
	type: GrantType.client_credentials;
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
