import React, { FC, useMemo } from "react";
import { Cell } from "../Cell";

interface RowProps {
  row: any;
  rowIndex: number;
  onHandleCellIncrement: (id: string) => void;
  onHandleClosestValues: (cell: any) => void;
  onHandleClearClosestValues: () => void;
  onHandleSumDeposit: (id: string) => void;
  onHandleClearDeposit: () => void;
}

export const Row: FC<RowProps> = React.memo(
  ({
    row,
    rowIndex,
    onHandleCellIncrement,
    onHandleClosestValues,
    onHandleClearClosestValues,
    onHandleSumDeposit,
    onHandleClearDeposit,
  }) => {
    const sum = useMemo(
      () => row.cells.reduce((a: number, b: any) => a + b.amount, 0),
      [row.cells]
    );

    return (
      <tr key={row.id}>
        <td>{rowIndex + 1}</td>
        {row.cells.map((cell: any) => (
          <Cell
            row={row}
            key={cell.id}
            cell={cell}
            onHandleCellIncrement={() => onHandleCellIncrement(cell.id)}
            onHandleClosestValues={() => onHandleClosestValues(cell)}
            onHandleClearClosestValues={() => onHandleClearClosestValues()}
          />
        ))}
        <td
          onMouseEnter={() => onHandleSumDeposit(row.id)}
          onMouseLeave={onHandleClearDeposit}
        >
          {sum}
        </td>
      </tr>
    );
  }
);
