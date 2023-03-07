import { nanoid } from "nanoid";
import { IRow } from "../types/interfaces";

interface IGenerateRow {
  columns: number;
}

export const useGenerateRow = ({ columns }: IGenerateRow): IRow => {
  const newRow: IRow = {
    id: nanoid(),
    cells: [],
    showDeposit: false,
  };

  for (let i = 0; i < columns; i += 1) {
    newRow.cells.push({
      id: String(Math.random()),
      amount: Math.round(Math.random() * (999 - 100 + 1) + 100),
      closest: false,
      deposit: 0,
      headId: nanoid(),
    });
  }
  return newRow;
};
