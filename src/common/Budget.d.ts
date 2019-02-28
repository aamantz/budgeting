export interface Budget {
	_id: string;
	name: string;
	items: IBudgetItem[];
	weeks: IBudgetWeek[];
}

export interface IBudgetItem {
	name: string;
	amount: number;
	date: string;
	paid: boolean;
}

export interface IBudgetWeek {
	name: string;
	items: number[];
}