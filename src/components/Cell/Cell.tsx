import classNames from "classnames";
import { FC, memo } from "react";
interface CellProps {
  row: any;
  cell: any;
  onHandleCellIncrement: (id: string) => void;
  onHandleClosestValues: (cell: any) => void;
  onHandleClearClosestValues: () => void;
}

export const Cell: FC<CellProps> = memo(
  ({
    row,
    cell,
    onHandleCellIncrement,
    onHandleClosestValues,
    onHandleClearClosestValues,
  }) => {
    const { closest, amount, deposit } = cell;
    const { showDeposit } = row;

    return (
      <td
        onClick={() => onHandleCellIncrement(cell.id)}
        onMouseEnter={() => onHandleClosestValues(cell)}
        onMouseLeave={onHandleClearClosestValues}
        className={classNames("table__cell", {
          table__cell_closest: closest,
        })}
        style={{
          background: showDeposit
            ? `linear-gradient(0deg, rgba(203,13,13,1) ${deposit}%,
                        rgba(0,212,255,0) ${deposit}%)`
            : "",
        }}
      >
        {showDeposit ? `${deposit}%` : amount}
      </td>
    );
  }
);
