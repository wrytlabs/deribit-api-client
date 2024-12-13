import { Currency } from '../client/general.types';

// unconfirmed, confirmed, cancelled, completed, interrupted, rejected

export type ApiWalletGetWithdrawalsParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

export type ApiWalletGetWithdrawalsResult = {
	count: number;
	data: ApiWalletGetWithdrawalsResultItem[];
};

export type ApiWalletGetWithdrawalsResultItem = {
	address: string;
	amount: number;
	confirmed_timestamp: number;
	created_timestamp: number;
	currency: Currency;
	fee: number;
	id: number;
	priority: number;
	state: string;
	transaction_id: string;
	updated_timestamp: number;
};
