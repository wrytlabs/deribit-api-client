import { Currency } from '../client/general.types';

export type ApiWalletGetTransfersParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

export type ApiWalletGetTransfersResult = {
	count: number;
	data: ApiWalletGetTransfersResultItem[];
};

export type ApiWalletGetTransfersResultItem = {
	amount: number;
	created_timestamp: number;
	currency: string;
	direction: string;
	id: number;
	other_side: string;
	state: string;
	type: string;
	updated_timestamp: number;
};
