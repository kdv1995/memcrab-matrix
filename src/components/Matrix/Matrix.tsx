import "./Matrix.scss";
import { FC, memo, useContext } from "react";
import { MatrixContext } from "../../context/matrixContext";
import { Row } from "../Row";
import { TableHead } from "../TableHead";
export const Matrix: FC = memo(() => {
  const { average, matrixState, setMatrixState, matrixFormData } =
    useContext(MatrixContext);

  const handleCellIncrement = (id: string) => {
    setMatrixState(
      matrixState.map((row) => ({
        ...row,
        cells: row.cells.map((cell) => {
          if (cell.id === id) {
            return { ...cell, amount: cell.amount + 1 };
          }
          return cell;
        }),
      }))
    );
  };

  const handleClosestValues = (payload: any) => {
    const { id, amount } = payload;
    const closestIds = matrixState
      .map((row) => row.cells)
      .flat()
      .filter((cell) => cell.id !== id)
      .map((cell) => ({
        id: cell.id,
        amount: Math.abs(cell.amount - amount),
      }))
      .sort((a, b) => a.amount - b.amount)
      .slice(0, matrixFormData.highlightAmount)
      .map((cell) => cell.id);

    setMatrixState(
      matrixState.map((row) => ({
        ...row,
        cells: row.cells.map((cell) => ({
          ...cell,
          closest: closestIds.includes(cell.id),
        })),
      }))
    );
  };
  const handleClearClosesValues = () => {
    const anyClosest = matrixState.some((row) =>
      row.cells.some((cell) => cell.closest)
    );
    if (anyClosest) {
      const updatedMatrixState = matrixState.map((row) => ({
        ...row,
        cells: row.cells.map((cell) => ({
          ...cell,
          closest: false,
        })),
      }));
      setMatrixState(updatedMatrixState);
    }
  };

  const handleSumDeposit = (id: string) => {
    const rowId = id;
    const rowSum = matrixState
      .filter((rowFind) => rowFind.id === rowId)[0]
      .cells.reduce((a, b) => a + b.amount, 0);
    setMatrixState(
      matrixState.map((row) => {
        if (rowId === row.id) {
          const updatedCells = row.cells.map((cell) => ({
            ...cell,
            deposit: Math.round((cell.amount / rowSum) * 100),
          }));
          return {
            ...row,
            showDeposit: true,
            cells: updatedCells,
          };
        }
        return row;
      })
    );
  };

  const handleClearDeposit = () => {
    setMatrixState(
      matrixState.map((row) => ({
        ...row,
        showDeposit: false,
      }))
    );
  };
  return (
    <div className="matrix-container">
      <table>
        <TableHead matrixState={matrixState} />
        <tbody>
          {matrixState.map((row, rowIndex) => (
            <Row
              row={row}
              rowIndex={rowIndex}
              key={row.id}
              onHandleCellIncrement={handleCellIncrement}
              onHandleClosestValues={handleClosestValues}
              onHandleClearClosestValues={handleClearClosesValues}
              onHandleSumDeposit={handleSumDeposit}
              onHandleClearDeposit={handleClearDeposit}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Avg</td>
            {average.map((item) => (
              <td key={Math.random()} className="table__columns_average">
                {item}
              </td>
            ))}
            <td className="table__columns_average_sum">
              {average.reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});
