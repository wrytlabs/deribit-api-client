import { Currency } from '../client/general.types';

export type ApiPrivateGetTransfersParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

export type ApiPrivateGetTransfersResult = {
	count: number;
	data: ApiPrivateGetTransfersResultItem[];
};

export type ApiPrivateGetTransfersResultItem = {
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
