import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletCancelTransferByIdParams = {
	currency: Currency;
	id: number;
};

// ---------------------------------------------------------------------------------------

export type WalletCancelTransferByIdResult = {
	amount: number;
	created_timestamp: number;
	currency: Currency;
	direction: string;
	id: number;
	other_side: string;
	state: WalletCancelTransferByIdState;
	type: WalletCancelTransferByIdType;
	updated_timestamp: number;
};

export enum WalletCancelTransferByIdState {
	prepared = 'prepared',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
	waiting_for_admin = 'waiting_for_admin',
	insufficient_funds = 'insufficient_funds',
	withdrawal_limit = 'withdrawal_limit',
}

// Type of transfer: user - sent to user, subaccount - sent to subaccount
export enum WalletCancelTransferByIdType {
	user = 'user',
	subaccount = 'subaccount',
}
