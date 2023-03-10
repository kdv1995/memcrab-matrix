import { MatrixType } from "../types";

export const useFindAverage = (matrix: MatrixType = []) => {
  if (matrix.length === 0) return [];

  const res = matrix
    .map((rowFindRes) =>
      rowFindRes.cells.map((cellFindRes) => cellFindRes.amount)
    )
    .reduce((a, b) => a.map((x, i) => x + b[i]))
    .map((item) => Math.round(item / matrix.length));
  return res;
};
