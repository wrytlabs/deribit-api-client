export enum WebSocketGrantType {
	client_public = 'client_public',
	client_credentials = 'client_credentials',
	client_signature = 'client_signature',
	refresh_token = 'refresh_token',
}

// ---------------------------------------------------------------------------------------

export type WebSocketClientOptions = WebSocketClientPublicOptions | WebSocketClientCredentialsOptions;

export type WebSocketClientPublicOptions = {
	type: WebSocketGrantType.client_public;
	baseUrl: string;
};

export type WebSocketClientCredentialsOptions = {
	type: WebSocketGrantType.client_credentials;
	baseUrl: string;
	clientId: string;
	clientSecret: string;
};

// ---------------------------------------------------------------------------------------

export type RequestQuery<ApiResult> = {
	jsonrpc: `${number}.${number}`;
	id: number;
	result?: ApiResult;
	error?: {
		code: number;
		message: string;
	};
	testnet: boolean;
	usDiff: number;
	usIn: number;
	usOut: number;
};

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
