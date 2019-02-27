export interface Budget {
	_id: string;
	name: string;
	items: IBudgetItem[];
}

export interface IBudgetItem {
	name: string;
	amount: number;
	date: string;
	paid: boolean;
}