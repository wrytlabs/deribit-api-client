import { DeribitApiClient } from './client/client';
import { DeribitApiClientOptions } from './client/client.types';

// function exports
export function createDeribitClient(options: DeribitApiClientOptions): DeribitApiClient {
	return new DeribitApiClient(options);
}

// type exports
export * from './client/client.types';
export * from './authentication/public.auth';
