import { useMemo } from "react";
import { IFormData, IMatrix } from "../types/interfaces";

export const useGenerateMatrix = (formData: IFormData): IMatrix[] => {
  const matrix = useMemo(() => {
    const newMatrix: IMatrix[] = [];
    for (let i = 0; i < formData.rows; i += 1) {
      newMatrix.push({
        showDeposit: false,
        cells: [],
        id: `${i + 1}_${i + 2}`,
      });
      for (let j = 0; j < formData.columns; j += 1) {
        newMatrix[i].cells.push({
          amount: Math.round(Math.random() * (999 - 100 + 1) + 100),
          closest: false,
          deposit: 0,
          id: `${i + 2}__${j + 1}`,
          headId: `${i + 1}/${j + 1}`,
        });
      }
    }
    return newMatrix;
  }, [formData.columns, formData.rows]);

  return matrix;
};
