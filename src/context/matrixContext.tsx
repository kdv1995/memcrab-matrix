import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  FC,
  SetStateAction,
  Dispatch,
  useCallback,
} from "react";
import { useFindAverage } from "../hooks/useFindAverage";
import { useGenerateMatrix } from "../hooks/useGenerateMatrix";
import { IFormData, IMatrix, INewRow } from "../types/interfaces";
import { generateRow } from "../utils/generateRow";

interface IMatrixContext {
  matrixState: IMatrix[];
  setMatrixState: Dispatch<SetStateAction<IMatrix[]>>;
  average: number[];
  addNewRow: INewRow;
  matrixFormData: IFormData;
  setMatrixFormData: Dispatch<SetStateAction<IFormData>>;
  handleAddNewRow: () => void;
  handleDeleteRow: (id: string) => void;
}

export const MatrixContext = createContext<IMatrixContext>({
  matrixState: [],
  setMatrixState: () => {},
  addNewRow: { id: "", showDeposit: false, cells: [] },
  average: [],
  matrixFormData: { rows: 0, columns: 0, highlightAmount: 0 },
  setMatrixFormData: () => {},
  handleAddNewRow: () => {},
  handleDeleteRow: () => {},
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
    const addNewRow = generateRow(matrixFormData);
    const [matrixState, setMatrixState] = useState(matrix);
    useEffect(() => {
      setMatrixState(matrix);
    }, [matrix]);

    const handleAddNewRow = useCallback((): void => {
      setMatrixState((prevState) => [...prevState, addNewRow]);
    }, [addNewRow, setMatrixState]);

    const handleDeleteRow = useCallback(
      (id: string) => {
        setMatrixState((prevState) => prevState.filter((row) => row.id !== id));
      },
      [setMatrixState]
    );
    const average = useFindAverage(matrixState);
    const contextValue = useMemo(
      () => ({
        matrixState,
        setMatrixState,
        average,
        addNewRow,
        matrixFormData,
        setMatrixFormData,
        handleAddNewRow,
        handleDeleteRow,
      }),
      [
        matrixState,
        setMatrixState,
        addNewRow,
        matrixFormData,
        setMatrixFormData,
        average,
        handleAddNewRow,
        handleDeleteRow,
      ]
    );

    return (
      <MatrixContext.Provider value={contextValue}>
        {children}
      </MatrixContext.Provider>
    );
  }
);
