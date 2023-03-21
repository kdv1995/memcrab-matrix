import { useMemo } from "react";
import { IMatrix } from "../types/interfaces";

export const useFindAverage = (matrix: IMatrix[] = []): number[] => {
  const res = useMemo(() => {
    if (matrix.length === 0) {
      return [];
    }
    const columnSums = Array(matrix[0].cells.length).fill(0);
    matrix.forEach((row) => {
      row.cells.forEach((cell, columnIndex) => {
        columnSums[columnIndex] += cell.amount;
      });
    });
    const columnAverages = columnSums.map((sum) =>
      Math.round(sum / matrix.length)
    );
    return columnAverages;
  }, [matrix]);
  return res;
};
