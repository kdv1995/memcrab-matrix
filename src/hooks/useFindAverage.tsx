import { useMemo } from "react";
import { IMatrix } from "../types/interfaces";

export const useFindAverage = (matrix: IMatrix[] = []): number[] => {
  const res = useMemo(() => {
    if (matrix.length === 0) {
      return [];
    }
    const sumOfCells = matrix.reduce((acc, row) => {
      return row.cells.reduce((rowSum, cell) => {
        return rowSum + cell.amount;
      }, acc);
    }, 0);

    const average = Math.round(
      sumOfCells / (matrix.length * matrix[0].cells.length)
    );

    return Array(matrix[0].cells.length).fill(average);
  }, [matrix]);
  return res;
};
