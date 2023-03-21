export interface IFormData {
  rows: number;
  columns: number;
  highlightAmount: number;
}
export interface IMatrix {
  id: string;
  showDeposit: boolean;
  cells: ICell[];
}

export interface IRow {
  id: string;
  showDeposit: boolean;
  cells: ICell[];
}
export interface INewRow {
  id: string;
  showDeposit: boolean;
  cells: ICell[];
}

export interface ICell {
  id: string;
  amount: number;
  closest: boolean;
  deposit: number;
  headId: string;
}
