import "./Matrix.scss";
import classNames from "classnames";
import { FC, useContext } from "react";
import { MatrixContext } from "context";
import { useGenerateMatrix } from "hooks/useGenerateMatrix";
import { useFindAverage } from "hooks/useFindAverage";

export const Matrix: FC = () => {
  const { matrixData } = useContext(MatrixContext);
  const matrix = useGenerateMatrix({
    rows: matrixData.rows,
    columns: matrixData.columns,
  });
  const findAverage = useFindAverage(matrix);
  return (
    <div className="matrix-container">
      <table>
        <thead>
          <tr>
            <td>№</td>
            {matrix[0].cells.map((cell, cellIndex) => (
              <td className="table__head" key={cell.headNumber}>
                {cellIndex + 1}
              </td>
            ))}
            <td>Sum</td>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={row.rowId}>
              <td key={row.rowNumber}>{rowIndex + 1}</td>
              {row.cells.map((cell) => (
                <td
                  key={cell.cellId}
                  className={classNames("table__cell", {
                    table__cell_closest: cell.closest,
                  })}
                >
                  {row.showDeposit ? `${cell.deposit}%` : cell.amount}
                </td>
              ))}
              <td>{row.cells.reduce((a, b) => a + b.amount, 0)}</td>
              <td>
                <button type="button">Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Avg</td>
            {findAverage.map((item) => (
              <td className="table__columns_average">{item}</td>
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
