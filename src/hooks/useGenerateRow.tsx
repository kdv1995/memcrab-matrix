import { nanoid } from "nanoid";
import { useMemo } from "react";
import { IFormData, INewRow } from "../types/interfaces";

export const useGenerateRow = (formData: IFormData): INewRow => {
  const row = useMemo(() => {
    const newRow: INewRow = {
      id: nanoid(),
      cells: [],
      showDeposit: false,
    };

    for (let i = 0; i < formData.columns; i += 1) {
      newRow.cells.push({
        id: String(Math.random()),
        amount: Math.round(Math.random() * (999 - 100 + 1) + 100),
        closest: false,
        deposit: 0,
        headId: nanoid(),
      });
    }
    return newRow;
  }, [formData.columns]);
  return row;
};
