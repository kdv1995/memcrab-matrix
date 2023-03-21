import React, { FC, useMemo } from "react";
import { Button } from "../Button";
import { Cell } from "../Cell";

interface RowProps {
  row: any;
  rowIndex: number;
  onHandleCellIncrement: (id: string) => void;
  onHandleClosestValues: (cell: any) => void;
  onHandleClearClosestValues: () => void;
  onHandleSumDeposit: (id: string) => void;
  onHandleClearDeposit: () => void;
  onHandleDeleteRow: (id: string) => void;
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
    onHandleDeleteRow,
  }) => {
    const sum = useMemo(
      () => row.cells.reduce((a: number, b: any) => a + b.amount, 0),
      [row.cells]
    );

    return (
      <tr key={row.id} onMouseOut={onHandleClearDeposit}>
        <td>{rowIndex + 1}</td>
        {row.cells.map((cell: any) => (
          <Cell
            row={row}
            key={cell.id}
            cell={cell}
            onHandleCellIncrement={() => onHandleCellIncrement(cell.id)}
            onHandleClearClosestValues={onHandleClearClosestValues}
            onHandleClosestValues={() => onHandleClosestValues(cell)}
          />
        ))}
        <td
          className="table__cell_sum"
          onMouseEnter={() => onHandleSumDeposit(row.id)}
        >
          {sum}
        </td>
        <td>
          <Button
            className=""
            title="Delete"
            type="button"
            onClick={() => onHandleDeleteRow(row.id)}
          />
        </td>
      </tr>
    );
  }
);
