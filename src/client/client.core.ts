import { RequestQuery, ClientOptions, GrantType } from './client.types';
import { AuthenticationMapping } from '../authentication/authentication.mapping';
import { WalletMapping } from '../wallet/wallet.mapping';
import {
	ErrorClientNotReady,
	ErrorClientRestrictedToPublic,
	ErrorClientRequestTimeout,
	ErrorClientRestrictedToScope,
} from './client.error';

export class DeribitApiClient {
	// class extentions
	public readonly type: GrantType;
	public readonly authentication: AuthenticationMapping;
	public readonly wallet: WalletMapping;

	// ---------------------------------------------------------------------------------------

	// core features
	private socket: WebSocket | undefined;
	private options: ClientOptions;
	private scope: string[];
	private requests: Map<number, Function>;
	private id: number;

	// ---------------------------------------------------------------------------------------

	constructor(options: ClientOptions) {
		this.type = options.type;
		this.authentication = new AuthenticationMapping(this);
		this.wallet = new WalletMapping(this);

		this.socket = undefined;
		this.options = options;
		this.scope = [];
		this.requests = new Map();
		this.id = 0;
		this.connect();
	}

	// ---------------------------------------------------------------------------------------

	private connect() {
		// create
		this.socket = new WebSocket(this.options.baseUrl);

		// reconnect after 5 seconds
		this.socket.onclose = () => {
			setTimeout(() => this.connect(), 5000);
		};

		// handle message and callback
		this.socket.onmessage = (event) => {
			const message = JSON.parse(event?.data);
			const { id } = message;

			// callback available?
			if (this.requests.has(id)) {
				const callback = this.requests.get(id);
				if (typeof callback === 'function') callback(message);
			}
		};

		// auto auth
		this.socket.onopen = (event) => {
			if (this.options.type === GrantType.client_credentials) {
				this.authentication
					.auth({
						client_id: this.options.clientId,
						client_secret: this.options.clientSecret,
						grant_type: GrantType.client_credentials,
					})
					.then((data) => {
						if ('error' in data) {
							console.log(data.error);
						} else {
							this.scope = data.result.scope.split(' ');
							console.log(this.scope);
						}
					})
					.catch(console.log);
			}
		};
	}

	// ---------------------------------------------------------------------------------------

	send<RequestParams, ApiResult>(
		method: string,
		scope: string[] = [],
		params: RequestParams,
		callback?: (data: RequestQuery<ApiResult>) => any
	): Promise<RequestQuery<ApiResult>> {
		return new Promise((resolve, reject) => {
			const id = this.id;
			this.id += 1;

			// check if auth is needed
			const isPrivate = method.split('/').includes('private');
			if (isPrivate && this.type === GrantType.client_public) {
				reject({ ...ErrorClientRestrictedToPublic, id });
			} else if (isPrivate && scope.length > 0) {
				// verify scope
				scope.forEach((s) => {
					if (!this.scope.includes(s)) reject({ ...ErrorClientRestrictedToScope, id });
				});
			}

			// reconnect if not open
			if (this.socket?.readyState !== WebSocket.OPEN) {
				this.connect();
			}

			// action if open
			if (this.socket?.readyState === WebSocket.OPEN) {
				this.requests.set(id, (data: RequestQuery<ApiResult>) => {
					if (callback != undefined) resolve(callback(data));
					else resolve(data);
				});
				this.socket.send(
					JSON.stringify({
						jsonrpc: '2.0',
						id,
						method,
						params,
					})
				);
				setTimeout(() => reject({ ...ErrorClientRequestTimeout, id }), 10000);
			} else {
				// reject if not open
				reject({ ...ErrorClientNotReady, id });
			}
		});
	}

	// ---------------------------------------------------------------------------------------

	close() {
		this.socket?.close();
	}
}
