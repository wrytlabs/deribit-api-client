import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletCancelTransferByIdParams = {
	currency: Currency;
	id: number;
	__scope: 'wallet:read_write';
};

// ---------------------------------------------------------------------------------------

export type WalletCancelTransferByIdResult = {
	amount: number;
	created_timestamp: number;
	currency: Currency;
	direction: string;
	id: number;
	other_side: string;
	state: WalletCancelTransferByIdResultState;
	type: string; // TODO: extend type to TransferUser Or TransferSubaccount
	updated_timestamp: number;
};

export enum WalletCancelTransferByIdResultState {
	prepared = 'prepared',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
	waiting_for_admin = 'waiting_for_admin',
	insufficient_funds = 'insufficient_funds',
	withdrawal_limit = 'withdrawal_limit',
}
