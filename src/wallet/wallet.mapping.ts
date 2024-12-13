import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { WalletGetDepositsParams, WalletGetDepositsResult } from './wallet.get_deposits';
import { WalletGetTransfersParams, WalletGetTransfersResult } from './wallet.get_transfers';
import { WalletGetWithdrawalsParams, WalletGetWithdrawalsResult } from './wallet.get_withdrawals';

export class WalletMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async getDeposits(
		params: WalletGetDepositsParams,
		modifier?: ((data: RequestQuery<WalletGetDepositsResult>) => any) | undefined
	): Promise<RequestQuery<WalletGetDepositsResult>> {
		return await this.client.send<WalletGetDepositsParams, WalletGetDepositsResult>(
			'/private/get_deposits',
			params,
			modifier
		);
	}

	public async getTransfers(
		params: WalletGetTransfersParams,
		modifier?: ((data: RequestQuery<WalletGetTransfersResult>) => any) | undefined
	): Promise<RequestQuery<WalletGetTransfersResult>> {
		return await this.client.send<WalletGetTransfersParams, WalletGetTransfersResult>(
			'/private/get_transfers',
			params,
			modifier
		);
	}

	public async getWithdrawals(
		params: WalletGetWithdrawalsParams,
		modifier?: ((data: RequestQuery<WalletGetWithdrawalsResult>) => any) | undefined
	): Promise<RequestQuery<WalletGetWithdrawalsResult>> {
		return await this.client.send<WalletGetWithdrawalsParams, WalletGetWithdrawalsResult>(
			'/private/get_withdrawals',
			params,
			modifier
		);
	}
}
