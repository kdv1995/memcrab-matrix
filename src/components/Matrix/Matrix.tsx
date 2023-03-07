import "./Matrix.scss";
import classNames from "classnames";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MatrixContext } from "../../context/matrixContext";
import { routes } from "../../constants/routes";
import { useFindAverage } from "../../hooks/useFindAverage";
import { useGenerateRow } from "../../hooks/useGenerateRow";

export const Matrix: FC = () => {
  const navigate = useNavigate();
  const { matrix, matrixData, highlightAmount } = useContext(MatrixContext);
  const [matrixState, setMatrixState] = useState(matrix);
  const findAverage = useFindAverage(matrixState);
  const handleCellIncrement = (id: string) => {
    setMatrixState((prevState) =>
      prevState.map((row) => ({
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
    const findClosestCells = matrixState
      .map((row) => row.cells)
      .flat()
      .filter((cell) => cell.id !== id)
      .map((cell) => ({
        id: cell.id,
        amount: Math.abs(cell.amount - amount),
      }))
      .sort((a, b) => a.amount - b.amount)
      .slice(0, highlightAmount);

    return setMatrixState((prevState) =>
      prevState.map((row) => ({
        ...row,
        cells: row.cells.map((cellClosest) => ({
          ...cellClosest,
          closest: !!findClosestCells.find(
            (cell) => cell.id === cellClosest.id
          ),
        })),
      }))
    );
  };

  const handleClearClosesValues = (): void =>
    setMatrixState((prevState) =>
      prevState.map((row) => ({
        ...row,
        cells: row.cells.map((cell) => ({
          ...cell,
          closest: false,
        })),
      }))
    );

  const handleSumDeposit = (id: string) => {
    const rowId = id;
    const rowSum = matrixState
      .filter((rowFind) => rowFind.id === rowId)[0]
      .cells.reduce((a, b) => a + b.amount, 0);
    setMatrixState((prevState) =>
      prevState.map((row) => {
        if (rowId === row.id)
          return {
            ...row,
            showDeposit: true,
            cells: row.cells.map((cell) => ({
              ...cell,
              deposit: Math.round((cell.amount / rowSum) * 100),
            })),
          };
        return row;
      })
    );
  };
  const handleClearDeposit = (): void =>
    setMatrixState((prevState) =>
      prevState.map((row) => ({
        ...row,
        showDeposit: false,
      }))
    );
  const useHandleAddNewRow = () => {
    const addNewRow = useGenerateRow({ columns: matrixData.columns });
    setMatrixState((prevState) => [...prevState, addNewRow]);
  };
  const handleDeleteRow = (id: string) => {
    setMatrixState((prevState) => prevState.filter((row) => row.id !== id));
  };
  useEffect(() => {
    if (!matrixState.length) {
      navigate(routes.MatrixForm.path);
    }
  }, [matrixState, navigate]);
  return (
    <div className="matrix-container">
      <button className="matrix__button" onClick={useHandleAddNewRow}>
        Add a row
      </button>
      <table>
        <thead>
          <tr>
            <td>№</td>
            {matrixState[0]?.cells.map((cell, cellIndex) => (
              <td className="table__head" key={cell.headId}>
                {cellIndex + 1}
              </td>
            ))}
            <td>Sum</td>
          </tr>
        </thead>
        <tbody>
          {matrixState.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>{rowIndex + 1}</td>
              {row.cells.map((cell) => (
                <td
                  key={cell.id}
                  onClick={() => handleCellIncrement(cell.id)}
                  onMouseEnter={() => handleClosestValues(cell)}
                  onMouseLeave={() => handleClearClosesValues()}
                  className={classNames("table__cell", {
                    table__cell_closest: cell.closest,
                  })}
                  style={{
                    background: row.showDeposit
                      ? `linear-gradient(0deg, rgba(203,13,13,1) ${cell.deposit}%,
                        rgba(0,212,255,0) ${cell.deposit}%)`
                      : "",
                  }}
                >
                  {row.showDeposit ? `${cell.deposit}%` : cell.amount}
                </td>
              ))}
              <td
                onMouseLeave={handleClearDeposit}
                onMouseEnter={() => handleSumDeposit(row.id)}
              >
                {row.cells.reduce((a, b) => a + b.amount, 0)}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteRow(row.id)}
                  className="matrix__button_delete"
                  type="button"
                >
                  Delete a row
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Avg</td>
            {findAverage.map((item) => (
              <td key={Math.random()} className="table__columns_average">
                {item}
              </td>
            ))}
            <td className="table__columns_average_sum">
              {findAverage.reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
