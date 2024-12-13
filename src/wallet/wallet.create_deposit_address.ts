import { Currency } from '../client/general.types';

// ---------------------------------------------------------------------------------------

export type WalletCreateDepositAddressParams = {
	currency: Currency;
};

// ---------------------------------------------------------------------------------------

export type WalletCreateDepositAddressResult = {
	address: string;
	created_timestamp: number;
	currency: Currency;
	type: WalletCreateDepositAddressType;
};

// Address type/purpose, allowed values : deposit, withdrawal, transfer
export enum WalletCreateDepositAddressType {
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	transfer = 'transfer',
}
