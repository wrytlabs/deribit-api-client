import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletGetCurrentDepositAddressParams = {
	currency: Currency;
};

// ---------------------------------------------------------------------------------------

export type WalletGetCurrentDepositAddressResult = {
	address: string;
	creation_timestamp: number;
	currency: Currency;
	requires_confirmation: boolean;
	requires_confirmation_change: boolean;
	status: WalletGetCurrentDepositAddressStatus;
	type: WalletGetCurrentDepositAddressType;
} | null;

// Address type/purpose, allowed values : deposit, withdrawal, transfer
export enum WalletGetCurrentDepositAddressType {
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	transfer = 'transfer',
}

export enum WalletGetCurrentDepositAddressStatus {
	ready = 'ready',
}
