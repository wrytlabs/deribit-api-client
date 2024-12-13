import { DeribitApiClient } from './client/client.core';
import { ClientOptions, ClientPublicOptions } from './client/client.types';
import { ClientPublicDefault } from './client/general.types';

// crete client
export function createDeribitClient(options: ClientOptions): DeribitApiClient {
	return new DeribitApiClient(options);
}

export function createDeribitClientPublic(options?: ClientPublicOptions): DeribitApiClient {
	return new DeribitApiClient(options ?? ClientPublicDefault);
}

// type exports
export * from './client/general.types';
export * from './client/client.types';

export * from './market/market.get_book_summary_by_currency';
export * from './market/market.get_book_summary_by_instrument';
export * from './market/market.get_currencies';
export * from './market/market.get_delivery_prices';

export * from './authentication/authentication.auth';

export * from './wallet/wallet.cancel_transfer_by_id';
export * from './wallet/wallet.cancel_withdrawal';
export * from './wallet/wallet.create_deposit_address';
export * from './wallet/wallet.get_deposits';
export * from './wallet/wallet.get_transfers';
export * from './wallet/wallet.get_withdrawals';
export * from './wallet/wallet.withdraw';
