import classNames from "classnames";
import "./Matrix.scss";
import { FC, useCallback, useContext } from "react";
import { MatrixContext } from "../../context/matrixContext";
// import { routes } from "../../constants/routes";
import { useGenerateRow } from "../../hooks/useGenerateRow";
// import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const Matrix: FC = () => {
  // const navigate = useNavigate();
  const { matrixState, setMatrixState, matrixFormData, average } =
    useContext(MatrixContext);
  const addNewRow = useGenerateRow(matrixFormData);

  const handleCellIncrement = useCallback(
    (id: string) => {
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
    },
    [setMatrixState]
  );

  const handleClosestValues = useCallback(
    (payload: any) => {
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
        .slice(0, matrixFormData.highlightAmount);

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
    },
    [matrixFormData.highlightAmount, matrixState, setMatrixState]
  );

  const handleClearClosesValues = useCallback(() => {
    setMatrixState((prevState) =>
      prevState.map((row) => ({
        ...row,
        cells: row.cells.map((cell) => ({
          ...cell,
          closest: false,
        })),
      }))
    );
  }, [setMatrixState]);

  const handleSumDeposit = useCallback(
    (id: string) => {
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
    },
    [setMatrixState]
  );
  const handleAddNewRow = (): void => {
    setMatrixState((prevState) => [...prevState, addNewRow]);
  };

  const handleClearDeposit = useCallback(() => {
    setMatrixState((prevState) =>
      prevState.map((row) => ({
        ...row,
        showDeposit: false,
      }))
    );
  }, [setMatrixState]);

  const handleDeleteRow = useCallback((id: string) => {
    setMatrixState((prevState) => prevState.filter((row) => row.id !== id));
  }, []);

  // useEffect(() => {
  //   if (!matrixState.length) {
  //     navigate(routes.MatrixForm.path);
  //   }
  // }, [matrixState, navigate]);
  return (
    <div className="matrix-container">
      <Button
        className="button"
        title="Add a row"
        onClick={handleAddNewRow}
        type="button"
      />
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
            {average.map((item) => (
              <td key={Math.random()} className="table__columns_average">
                {item}
              </td>
            ))}
            <td className="table__columns_average_sum">
              {average.reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
