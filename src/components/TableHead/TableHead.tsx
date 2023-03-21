import { FC } from "react";
import { IMatrix } from "../../types/interfaces";

interface THeadProps {
  matrixState: IMatrix[];
}

export const TableHead: FC<THeadProps> = ({ matrixState }) => {
  return (
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
  );
};
