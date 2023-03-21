import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import { useFindAverage } from "../hooks/useFindAverage";
import { useGenerateMatrix } from "../hooks/useGenerateMatrix";
import { useGenerateRow } from "../hooks/useGenerateRow";
import { IFormData, IMatrix, INewRow } from "../types/interfaces";

interface IMatrixContext {
  matrixState: IMatrix[];
  setMatrixState: Dispatch<SetStateAction<IMatrix[]>>;
  average: number[];
  addNewRow: INewRow;
  matrixFormData: IFormData;
  setMatrixFormData: Dispatch<SetStateAction<IFormData>>;
}

export const MatrixContext = createContext<IMatrixContext>({
  matrixState: [],
  setMatrixState: () => {},
  addNewRow: { id: "", showDeposit: false, cells: [] },
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
    const addNewRow = useGenerateRow(matrixFormData);
    const [matrixState, setMatrixState] = useState(matrix);
    useEffect(() => {
      setMatrixState(matrix);
    }, [matrix]);
    // const handleAddNewRow = (): void => {
    //   setMatrixState((prevState) => [...prevState, addNewRow]);
    // };
    // const handleDeleteRow = (id: string) => {
    //   setMatrixState((prevState) => prevState.filter((row) => row.id !== id));
    // };

    const average = useFindAverage(matrixState);
    const contextValue = useMemo(
      () => ({
        matrixState,
        setMatrixState,
        average,
        addNewRow,
        matrixFormData,
        setMatrixFormData,
      }),
      [
        matrixState,
        setMatrixState,
        addNewRow,
        matrixFormData,
        setMatrixFormData,
        average,
      ]
    );

    return (
      <MatrixContext.Provider value={contextValue}>
        {children}
      </MatrixContext.Provider>
    );
  }
);
