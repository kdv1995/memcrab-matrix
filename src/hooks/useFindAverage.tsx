import { useMemo } from "react";
interface Cell {
  amount: number;
}

interface Row {
  cells: Cell[];
}

type Matrix = Row[];

export const useFindAverage = (matrix: Matrix) =>
  useMemo(() => {
    const res = matrix
      .map((rowFindRes) =>
        rowFindRes.cells.map((cellFindRes) => cellFindRes.amount)
      )
      .reduce((a, b) => a.map((x, i) => x + b[i]))
      .map((item) => Math.round(item / matrix.length));
    return res;
  }, [matrix]);
