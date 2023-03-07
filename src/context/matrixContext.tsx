import { useGenerateMatrix } from "hooks/useGenerateMatrix";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { IRow } from "types/interfaces";

export type Matrix = IRow[];

interface MatrixData {
  [key: string]: number;
}

interface MatrixContextType {
  matrix: Matrix;
  setMatrixData: Dispatch<SetStateAction<MatrixData>>;
  setHighlightAmount: Dispatch<SetStateAction<number>>;
  highlightAmount: number;
  matrixData: { columns: number };
  isSubmitted: boolean;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const MatrixContext = createContext<MatrixContextType>({
  matrix: [],
  setMatrixData: () => {},
  highlightAmount: 0,
  setHighlightAmount: () => {},
  matrixData: { columns: 0 },
  isSubmitted: false,
  setIsSubmitted: (): void => {},
});

interface IMatrixProviderProps {
  children: React.ReactNode;
}

export const MatrixProvider: FC<IMatrixProviderProps> = ({ children }) => {
  const [matrixData, setMatrixData] = useState<MatrixData>({});
  const [highlightAmount, setHighlightAmount] = useState(0);
  const matrix: Matrix = useGenerateMatrix({
    rows: matrixData.rows,
    columns: matrixData.columns,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <MatrixContext.Provider
      value={{
        setMatrixData,
        matrix,
        highlightAmount,
        setHighlightAmount,
        matrixData: { columns: matrixData.columns },
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
