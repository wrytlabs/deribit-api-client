import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { WalletCancelTransferByIdParams, WalletCancelTransferByIdResult } from './wallet.cancel_transfer_by_id';
import { WalletCancelWithdrawalParams, WalletCancelWithdrawalResult } from './wallet.cancel_withdrawal';
import { WalletCreateDepositAddressParams, WalletCreateDepositAddressResult } from './wallet.create_deposit_address';
import {
	WalletGetCurrentDepositAddressParams,
	WalletGetCurrentDepositAddressResult,
} from './wallet.get_current_deposit_address';
import { WalletGetDepositsParams, WalletGetDepositsResult } from './wallet.get_deposits';
import { WalletGetTransfersParams, WalletGetTransfersResult } from './wallet.get_transfers';
import { WalletGetWithdrawalsParams, WalletGetWithdrawalsResult } from './wallet.get_withdrawals';
import { WalletWithdrawParams, WalletWithdrawResult } from './wallet.withdraw';

export class WalletMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async cancelTransferById(
		params: WalletCancelTransferByIdParams,
		modifier?: ((data: RequestQuery<WalletCancelTransferByIdResult>) => any) | undefined
	): Promise<RequestQuery<WalletCancelTransferByIdResult>> {
		return await this.client.send<WalletCancelTransferByIdParams, WalletCancelTransferByIdResult>(
			'/private/cancel_transfer_by_id',
			['wallet:read_write'],
			params,
			modifier
		);
	}

	public async cancelWithdrawal(
		params: WalletCancelWithdrawalParams,
		modifier?: ((data: RequestQuery<WalletCancelWithdrawalResult>) => any) | undefined
	): Promise<RequestQuery<WalletCancelWithdrawalResult>> {
		return await this.client.send<WalletCancelWithdrawalParams, WalletCancelWithdrawalResult>(
			'/private/cancel_withdrawal',
			['wallet:read_write'],
			params,
			modifier
		);
	}

	public async createDepositaddress(
		params: WalletCreateDepositAddressParams,
		modifier?: ((data: RequestQuery<WalletCreateDepositAddressResult>) => any) | undefined
	): Promise<RequestQuery<WalletCreateDepositAddressResult>> {
		return await this.client.send<WalletCreateDepositAddressParams, WalletCreateDepositAddressResult>(
			'/private/create_deposit_address',
			['wallet:read_write'],
			params,
			modifier
		);
	}

	public async getCurrentDepositaddress(
		params: WalletGetCurrentDepositAddressParams,
		modifier?: ((data: RequestQuery<WalletGetCurrentDepositAddressResult>) => any) | undefined
	): Promise<RequestQuery<WalletGetCurrentDepositAddressResult>> {
		return await this.client.send<WalletGetCurrentDepositAddressParams, WalletGetCurrentDepositAddressResult>(
			'/private/get_current_deposit_address',
			['wallet:read'],
			params,
			modifier
		);
	}

	public async getDeposits(
		params: WalletGetDepositsParams,
		modifier?: ((data: RequestQuery<WalletGetDepositsResult>) => any) | undefined
	): Promise<RequestQuery<WalletGetDepositsResult>> {
		return await this.client.send<WalletGetDepositsParams, WalletGetDepositsResult>(
			'/private/get_deposits',
			['wallet:read'],
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
			['wallet:read'],
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
			['wallet:read'],
			params,
			modifier
		);
	}

	public async withdraw(
		params: WalletWithdrawParams,
		modifier?: ((data: RequestQuery<WalletWithdrawResult>) => any) | undefined
	): Promise<RequestQuery<WalletWithdrawResult>> {
		return await this.client.send<WalletWithdrawParams, WalletWithdrawResult>(
			'/private/withdraw',
			['wallet:read_write'],
			params,
			modifier
		);
	}
}
