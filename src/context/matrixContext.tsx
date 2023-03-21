import React from "react";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFindAverage } from "../hooks/useFindAverage";
import { useGenerateMatrix } from "../hooks/useGenerateMatrix";
import { IFormData, IMatrix } from "../types/interfaces";

interface IMatrixContext {
  matrixState: IMatrix[];
  setMatrixState: Dispatch<SetStateAction<IMatrix[]>>;
  average: number[];
  matrixFormData: IFormData;
  setMatrixFormData: Dispatch<SetStateAction<IFormData>>;
}

export const MatrixContext = createContext<IMatrixContext>({
  matrixState: [],
  setMatrixState: () => {},
  average: [],
  matrixFormData: { rows: 0, columns: 0, highlightAmount: 0 },
  setMatrixFormData: () => {},
});

interface IMatrixProviderProps {
  children: React.ReactNode;
}

export const MatrixProvider: FC<IMatrixProviderProps> = React.memo(
  ({ children }) => {
    const [matrixFormData, setMatrixFormData] = useState<IFormData>({
      rows: 0,
      columns: 0,
      highlightAmount: 0,
    });

    const matrix = useGenerateMatrix(matrixFormData);
    const [matrixState, setMatrixState] = useState(matrix);
    const average = useFindAverage(matrixState);

    useEffect(() => {
      setMatrixState(matrix);
    }, [matrix]);

    const contextValue = useMemo(
      () => ({
        matrixState,
        setMatrixState,
        matrixFormData,
        setMatrixFormData,
        average,
      }),
      [matrixState, setMatrixState, average, matrixFormData, setMatrixFormData]
    );

    return (
      <MatrixContext.Provider value={contextValue}>
        {children}
      </MatrixContext.Provider>
    );
  }
);
