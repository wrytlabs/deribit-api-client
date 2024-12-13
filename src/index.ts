import { DeribitApiClient } from './client/client.core';
import { DeribitApiClientOptions } from './client/client.types';

// function exports
export function createDeribitClient(options: DeribitApiClientOptions): DeribitApiClient {
	return new DeribitApiClient(options);
}

// type exports
export * from './client/general.types';
export * from './client/client.types';
export * from './authentication/authentication.auth';
export * from './wallet/wallet.get_deposits';
export * from './wallet/wallet.get_transfers';
export * from './wallet/wallet.get_withdrawals';
