import { Currency } from '../client/general.types';

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
	state: string;
	transaction_id: string;
	updated_timestamp: number;
};
