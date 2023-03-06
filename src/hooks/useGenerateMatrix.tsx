
interface Cell {
  amount: number;
  closest: boolean;
  deposit: number;
  cellId: string;
  headNumber: string;
}

interface Row {
  showDeposit: boolean;
  cells: Cell[];
  rowId: string;
  rowNumber: string;
}

export const useGenerateMatrix = (formData: {
  rows: number;
  columns: number;
}): Row[] => {
  const matrix: Row[] = [];
  for (let i = 0; i < formData.rows; i += 1) {
    matrix.push({
      showDeposit: false,
      cells: [],
      rowId: `${i + 1}=${i + 1}`,
      rowNumber: `${i + 1}+${i + 1}`,
    });
    for (let j = 0; j < formData.columns; j += 1) {
      matrix[i].cells.push({
        amount: Math.round(Math.random() * (999 - 100 + 1) + 100),
        closest: false,
        deposit: 0,
        cellId: `${j + 1}_${j + 1}`,
        headNumber: `${i + 1}/${j + 1}`,
      });
    }
  }
  return matrix;
};
