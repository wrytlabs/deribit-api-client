import { WebSocketClient } from './client/WebSocketClient';
import { WebSocketClientOptions } from './client/WebSocketClient.types';

// function exports
export function createWebSocketClient(options: WebSocketClientOptions): WebSocketClient {
	return new WebSocketClient(options);
}

// type exports
export * from './client/WebSocketClient.types';
