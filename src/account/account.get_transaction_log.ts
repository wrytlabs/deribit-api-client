import { Currency } from '../client/general.types';

export type GetTransactionLogParams = {
	currency: Currency;
	start_timestamp: number;
	end_timestamp: number;
	query?: TransactionQuery;
	count?: number;
	continuation?: number;
};

export type GetTransactionLogResult = {
	continuation: number | null;
	logs: TransactionLog[];
};

export type TransactionLog = {
	amount: number;
	balance: number;
	cashflow: number;
	change: number;
	commission: number;
	contracts: number;
	currency: Currency;
	equity: number;
	fee_balance: number;
	id: number;
	index_price: number;
	info: Record<string, any>;
	instrument_name: string;
	interest_pl: number;
	mark_price: number;
	order_id: string;
	position: number;
	price: number;
	price_currency: Currency;
	profit_as_cashflow: boolean;
	session_rpl: number;
	session_upl: number;
	side: TransactionSide;
	timestamp: number;
	total_interest_pl: number;
	trade_id: string;
	type: TransactionType;
	user_id: number;
	user_role: TransactionRole;
	user_seq: number;
	username: string;
};

export enum TransactionQuery {
	trade = 'trade',
	maker = 'maker',
	taker = 'taker',
	open = 'open',
	close = 'close',
	liquidation = 'liquidation',
	buy = 'buy',
	sell = 'sell',
	withdrawal = 'withdrawal',
	delivery = 'delivery',
	settlement = 'settlement',
	deposit = 'deposit',
	transfer = 'transfer',
	option = 'option',
	future = 'future',
	correction = 'correction',
	block_trade = 'block_trade',
	swap = 'swap',
}

export enum TransactionSide {
	short = 'short',
	long = 'long',
	close_sell = 'close sell',
	close_buy = 'close buy',
	open_sell = 'open sell',
	open_buy = 'open buy',
}

export enum TransactionType {
	trade = 'trade',
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	settlement = 'settlement',
	delivery = 'delivery',
	transfer = 'transfer',
	swap = 'swap',
	correction = 'correction',
}

export enum TransactionRole {
	maker = 'maker',
	taker = 'taker',
}
