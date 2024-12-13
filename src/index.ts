import { DeribitApiClient } from './client/DeribitApiClient';
import { DeribitApiClientOptions } from './client/DeribitApiClient.types';

// function exports
export function createDeribitClient(options: DeribitApiClientOptions): DeribitApiClient {
	return new DeribitApiClient(options);
}

// type exports
export * from './client/DeribitApiClient.types';
export * from './public/public.auth';
