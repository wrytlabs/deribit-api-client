import { Currency } from '../client/general.types';

export enum ApiWalletGetTransfersResultState {
	prepared,
	confirmed,
	cancelled,
	waiting_for_admin,
	insufficient_funds,
	withdrawal_limit,
}

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
	state: ApiWalletGetTransfersResultState;
	type: string;
	updated_timestamp: number;
};
