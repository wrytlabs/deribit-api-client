import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletWithdrawParams = {
	currency: Currency;
	address: string;
	amount: number;
	priority?: WalletWithdrawPriority;
};

export enum WalletWithdrawPriority {
	insane = 'insane',
	extreme_high = 'extreme_high',
	very_high = 'very_high',
	high = 'high',
	mid = 'mid',
	low = 'low',
	very_low = 'very_low',
}

// ---------------------------------------------------------------------------------------

export type WalletWithdrawResult = {
	address: string;
	amount: number;
	confirmed_timestamp: number;
	created_timestamp: number;
	currency: Currency;
	fee: number;
	id: number;
	priority: number;
	state: WalletWithdrawState;
	transaction_id: string;
	updated_timestamp: number;
};

export enum WalletWithdrawState {
	unconfirmed = 'unconfirmed',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
	completed = 'completed',
	interrupted = 'interrupted',
	rejected = 'rejected',
}
