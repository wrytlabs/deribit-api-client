import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { ApiWalletGetDepositsParams, ApiWalletGetDepositsResult } from './wallet.get_deposits';
import { ApiWalletGetTransfersParams, ApiWalletGetTransfersResult } from './wallet.get_transfers';

export class WalletMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async getDeposits(
		params: ApiWalletGetDepositsParams,
		modifier?: ((data: RequestQuery<ApiWalletGetDepositsResult>) => any) | undefined
	): Promise<RequestQuery<ApiWalletGetDepositsResult>> {
		return await this.client.send<ApiWalletGetDepositsParams, ApiWalletGetDepositsResult>('/private/get_deposits', params, modifier);
	}

	public async getTransfers(
		params: ApiWalletGetTransfersParams,
		modifier?: ((data: RequestQuery<ApiWalletGetTransfersResult>) => any) | undefined
	): Promise<RequestQuery<ApiWalletGetTransfersResult>> {
		return await this.client.send<ApiWalletGetTransfersParams, ApiWalletGetTransfersResult>('/private/get_transfers', params, modifier);
	}
}
