import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { ApiWalletGetTransfersParams, ApiWalletGetTransfersResult } from './wallet.get_transfers';

export class WalletMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async getTransfer(
		params: ApiWalletGetTransfersParams,
		modifier?: ((data: RequestQuery<ApiWalletGetTransfersResult>) => any) | undefined
	): Promise<RequestQuery<ApiWalletGetTransfersResult>> {
		return await this.client.send<ApiWalletGetTransfersParams, ApiWalletGetTransfersResult>('/private/get_transfers', params, modifier);
	}
}
