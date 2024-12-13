import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletGetDepositsParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

// ---------------------------------------------------------------------------------------

export type WalletGetDepositsResult = {
	count: number;
	data: WalletGetDepositsItem[];
};

export type WalletGetDepositsItem = {
	address: string;
	amount: number;
	currency: Currency | string;
	received_timestamp: number;
	state: WalletGetDepositsState;
	transaction_id: string;
	updated_timestamp: number;
};

export enum WalletGetDepositsState {
	pending = 'pending',
	completed = 'completed',
	rejected = 'rejected',
	replaced = 'replaced',
}
