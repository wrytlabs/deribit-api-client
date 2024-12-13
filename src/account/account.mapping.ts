import { DeribitApiClient } from '../client/client.core';
import { RequestQuery } from '../client/client.types';
import { GetAccountSummariesParams, GetAccountSummariesResult } from './account.get_account_summaries';
import { GetAccountSummaryParams, GetAccountSummaryResult } from './account.get_account_summary';
import { AccountGetPortfolioMarginsParams, AccountGetPortfolioMarginsResult } from './account.get_portfolio_margins';
import { GetPositionParams, GetPositionResult } from './account.get_position';

export class AccountMapping {
	private readonly client: DeribitApiClient;

	constructor(_connector: DeribitApiClient) {
		this.client = _connector;
	}

	public async getAccountSummaries<Modifier = RequestQuery<GetAccountSummariesResult>>(
		params: GetAccountSummariesParams,
		modifier?: ((data: RequestQuery<GetAccountSummariesResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<GetAccountSummariesParams, GetAccountSummariesResult, Modifier>(
			'/private/get_account_summaries',
			[],
			params,
			modifier
		);
	}

	public async getAccountSummary<Modifier = RequestQuery<GetAccountSummaryResult>>(
		params: GetAccountSummaryParams,
		modifier?: ((data: RequestQuery<GetAccountSummaryResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<GetAccountSummaryParams, GetAccountSummaryResult, Modifier>(
			'/private/get_account_summary',
			[],
			params,
			modifier
		);
	}

	public async getPortfolioMargins<Modifier = RequestQuery<AccountGetPortfolioMarginsResult>>(
		params: AccountGetPortfolioMarginsParams,
		modifier?: ((data: RequestQuery<AccountGetPortfolioMarginsResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<AccountGetPortfolioMarginsParams, AccountGetPortfolioMarginsResult, Modifier>(
			'/private/get_portfolio_margins',
			[],
			params,
			modifier
		);
	}

	public async getPosition<Modifier = RequestQuery<GetPositionResult>>(
		params: GetPositionParams,
		modifier?: ((data: RequestQuery<GetPositionResult>) => Modifier) | undefined
	): Promise<Modifier> {
		return await this.client.send<GetPositionParams, GetPositionResult, Modifier>(
			'/private/get_position',
			[],
			params,
			modifier
		);
	}
}
