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

	public async cancelTransferById<Modifier = RequestQuery<WalletCancelTransferByIdResult>>(
		params: WalletCancelTransferByIdParams,
		modifier?: ((data: RequestQuery<WalletCancelTransferByIdResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletCancelTransferByIdParams, WalletCancelTransferByIdResult, Modifier>(
			'/private/cancel_transfer_by_id',
			['wallet:read_write'],
			params,
			modifier
		);
	}

	public async cancelWithdrawal<Modifier = RequestQuery<WalletCancelWithdrawalResult>>(
		params: WalletCancelWithdrawalParams,
		modifier?: ((data: RequestQuery<WalletCancelWithdrawalResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletCancelWithdrawalParams, WalletCancelWithdrawalResult, Modifier>(
			'/private/cancel_withdrawal',
			['wallet:read_write'],
			params,
			modifier
		);
	}

	public async createDepositaddress<Modifier = RequestQuery<WalletCreateDepositAddressResult>>(
		params: WalletCreateDepositAddressParams,
		modifier?: ((data: RequestQuery<WalletCreateDepositAddressResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletCreateDepositAddressParams, WalletCreateDepositAddressResult, Modifier>(
			'/private/create_deposit_address',
			['wallet:read_write'],
			params,
			modifier
		);
	}

	public async getCurrentDepositaddress<Modifier = RequestQuery<WalletGetCurrentDepositAddressResult>>(
		params: WalletGetCurrentDepositAddressParams,
		modifier?: ((data: RequestQuery<WalletGetCurrentDepositAddressResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<
			WalletGetCurrentDepositAddressParams,
			WalletGetCurrentDepositAddressResult,
			Modifier
		>('/private/get_current_deposit_address', ['wallet:read'], params, modifier);
	}

	public async getDeposits<Modifier = RequestQuery<WalletGetDepositsResult>>(
		params: WalletGetDepositsParams,
		modifier?: ((data: RequestQuery<WalletGetDepositsResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletGetDepositsParams, WalletGetDepositsResult, Modifier>(
			'/private/get_deposits',
			['wallet:read'],
			params,
			modifier
		);
	}

	public async getTransfers<Modifier = RequestQuery<WalletGetTransfersResult>>(
		params: WalletGetTransfersParams,
		modifier?: ((data: RequestQuery<WalletGetTransfersResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletGetTransfersParams, WalletGetTransfersResult, Modifier>(
			'/private/get_transfers',
			['wallet:read'],
			params,
			modifier
		);
	}

	public async getWithdrawals<Modifier = RequestQuery<WalletGetWithdrawalsResult>>(
		params: WalletGetWithdrawalsParams,
		modifier?: ((data: RequestQuery<WalletGetWithdrawalsResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletGetWithdrawalsParams, WalletGetWithdrawalsResult, Modifier>(
			'/private/get_withdrawals',
			['wallet:read'],
			params,
			modifier
		);
	}

	public async withdraw<Modifier = RequestQuery<WalletWithdrawResult>>(
		params: WalletWithdrawParams,
		modifier?: ((data: RequestQuery<WalletWithdrawResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<WalletWithdrawParams, WalletWithdrawResult, Modifier>(
			'/private/withdraw',
			['wallet:read_write'],
			params,
			modifier
		);
	}
}
