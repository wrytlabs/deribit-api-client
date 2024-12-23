import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletCreateDepositAddressParams = {
	currency: Currency;
};

// ---------------------------------------------------------------------------------------

export type WalletCreateDepositAddressResult = {
	address: string;
	creation_timestamp: number;
	currency: Currency;
	requires_confirmation: boolean;
	requires_confirmation_change: boolean;
	status: WalletCreateDepositAddressStatus;
	type: WalletCreateDepositAddressType;
};

export enum WalletCreateDepositAddressStatus {
	ready = 'ready',
}

// Address type/purpose, allowed values : deposit, withdrawal, transfer
export enum WalletCreateDepositAddressType {
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	transfer = 'transfer',
}
