import { Currency } from '../client/general.types';

export type WalletGetTransfersParams = {
	currency: Currency;
	count?: number;
	offset?: number;
};

export type WalletGetTransfersResult = {
	count: number;
	data: WalletGetTransfersResultItem[];
};

export type WalletGetTransfersResultItem = {
	amount: number;
	created_timestamp: number;
	currency: string;
	direction: string;
	id: number;
	other_side: string;
	state: WalletGetTransfersResultState;
	type: string;
	updated_timestamp: number;
};

export enum WalletGetTransfersResultState {
	prepared = 'prepared',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
	waiting_for_admin = 'waiting_for_admin',
	insufficient_funds = 'insufficient_funds',
	withdrawal_limit = 'withdrawal_limit',
}
