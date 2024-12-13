import { ClientPublicOptions, GrantType } from './client.types';

export enum Currency {
	BTC = 'BTC',
	ETH = 'ETH',
	USDC = 'USDC',
	USDT = 'USDT',
	EURR = 'EURR',
}

export const ClientPublicDefault: ClientPublicOptions = {
	type: GrantType.client_public,
	baseUrl: 'wss://www.deribit.com/ws/api/v2',
};
