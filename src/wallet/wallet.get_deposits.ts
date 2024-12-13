import { Currency } from '../client/general.types';

export type WalletGetDepositsParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

export type WalletGetDepositsResult = {
	count: number;
	data: WalletGetDepositsResultItem[];
};

export type WalletGetDepositsResultItem = {
	address: string;
	amount: number;
	currency: Currency | string;
	received_timestamp: number;
	state: WalletGetDepositsResultState;
	transaction_id: string;
	updated_timestamp: number;
};

export enum WalletGetDepositsResultState {
	pending = 'pending',
	completed = 'completed',
	rejected = 'rejected',
	replaced = 'replaced',
}
