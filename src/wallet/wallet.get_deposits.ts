import { Currency } from '../client/general.types';

export enum ApiWalletGetDepositsResultState {
	pending,
	completed,
	rejected,
	replaced,
}

export type ApiWalletGetDepositsParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

export type ApiWalletGetDepositsResult = {
	count: number;
	data: ApiWalletGetDepositsResultItem[];
};

export type ApiWalletGetDepositsResultItem = {
	address: string;
	amount: number;
	currency: Currency | string;
	received_timestamp: number;
	state: ApiWalletGetDepositsResultState;
	transaction_id: string;
	updated_timestamp: number;
};
