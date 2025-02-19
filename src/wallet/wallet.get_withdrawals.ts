import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletGetWithdrawalsParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

// ---------------------------------------------------------------------------------------

export type WalletGetWithdrawalsResult = {
	count: number;
	data: WalletGetWithdrawalsItem[];
};

export type WalletGetWithdrawalsItem = {
	address: string;
	amount: number;
	confirmed_timestamp: number;
	created_timestamp: number;
	currency: Currency;
	fee: number;
	id: number;
	priority: number;
	state: WalletGetWithdrawalsState;
	transaction_id: string;
	updated_timestamp: number;
};

export enum WalletGetWithdrawalsState {
	unconfirmed = 'unconfirmed',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
	completed = 'completed',
	interrupted = 'interrupted',
	rejected = 'rejected',
}
