export interface ICell {
  id: string;
  amount: number;
  closest: boolean;
  deposit: number;
  headId: string;
}

export interface IRow {
  showDeposit: boolean;
  cells: ICell[];
  id: string;
}
