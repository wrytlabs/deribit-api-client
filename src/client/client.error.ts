import { RequestQueryError } from './client.types';

export const ErrorClientNotReady: RequestQueryError = {
	jsonrpc: '2.0',
	id: 0,
	error: {
		code: -1,
		message: 'Client Not Ready',
	},
	testnet: false,
	usDiff: 0,
	usIn: 0,
	usOut: 0,
};

export const ErrorClientRequestTimeout: RequestQueryError = {
	jsonrpc: '2.0',
	id: 0,
	error: {
		code: -2,
		message: 'Client trequest imeout',
	},
	testnet: false,
	usDiff: 0,
	usIn: 0,
	usOut: 0,
};

export const ErrorClientRestrictedToPublic: RequestQueryError = {
	jsonrpc: '2.0',
	id: 0,
	error: {
		code: -3,
		message: 'Client is restricted to public calls',
	},
	testnet: false,
	usDiff: 0,
	usIn: 0,
	usOut: 0,
};

export const ErrorClientRestrictedToScope: RequestQueryError = {
	jsonrpc: '2.0',
	id: 0,
	error: {
		code: -4,
		message: 'Client is restricted to scope calls',
	},
	testnet: false,
	usDiff: 0,
	usIn: 0,
	usOut: 0,
};
