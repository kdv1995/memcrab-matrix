import { IRow } from "types/interfaces";

export const useGenerateMatrix = (formData: {
  rows: number;
  columns: number;
}): IRow[] => {
  const matrix: IRow[] = [];
  for (let i = 0; i < formData.rows; i += 1) {
    matrix.push({
      showDeposit: false,
      cells: [],
      id: `${i + 1}_${i + 2}`,
    });
    for (let j = 0; j < formData.columns; j += 1) {
      matrix[i].cells.push({
        amount: Math.round(Math.random() * (999 - 100 + 1) + 100),
        closest: false,
        deposit: 0,
        id: `${i + 2}__${j + 1}`,
        headId: `${i + 1}/${j + 1}`,
      });
    }
  }
  return matrix;
};
