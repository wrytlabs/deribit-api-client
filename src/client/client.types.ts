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
		data?: any;
		message: string;
	};
	testnet: boolean;
	usDiff: number;
	usIn: number;
	usOut: number;
};

export type RateLimit = {
	rate: number;
	burst: number;
};

export type ApiLimit = {
	timeframe: number;
	rate: number;
};

export type AccountLimits = {
	matching_engine: {
		block_rfq_maker: RateLimit;
		cancel_all: RateLimit;
		guaranteed_mass_quotes: RateLimit;
		maximum_mass_quotes: RateLimit;
		maximum_quotes: RateLimit;
		spot: RateLimit;
		trading: {
			total: RateLimit;
		};
	};
	limits_per_currency: boolean;
	non_matching_engine: RateLimit;
};
