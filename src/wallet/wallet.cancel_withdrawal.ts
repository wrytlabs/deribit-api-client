import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletCancelWithdrawalParams = {
	currency: Currency;
	id: number;
};

// ---------------------------------------------------------------------------------------

export type WalletCancelWithdrawalResult = {
	address: string;
	amount: number;
	confirmed_timestamp: number;
	created_timestamp: number;
	currency: Currency;
	fee: number;
	id: number;
	priority: number;
	state: WalletCancelWithdrawalState;
	transaction_id: string;
	updated_timestamp: number;
};

export enum WalletCancelWithdrawalState {
	unconfirmed = 'unconfirmed',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
	completed = 'completed',
	interrupted = 'interrupted',
	rejected = 'rejected',
}
