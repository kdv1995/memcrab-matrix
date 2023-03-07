import { createContext, FC, useState } from "react";

interface MatrixData {
  [key: string]: number;
}

interface MatrixContextType {
  matrixData: MatrixData;
  setMatrixData: React.Dispatch<React.SetStateAction<MatrixData>>;
}

export const MatrixContext = createContext<MatrixContextType>({
  matrixData: {},
  setMatrixData: () => {},
});

interface IMatrixProviderProps {
  children: React.ReactNode;
}

export const MatrixProvider: FC<IMatrixProviderProps> = ({ children }) => {
  const [matrixData, setMatrixData] = useState<MatrixData>({});

  return (
    <MatrixContext.Provider value={{ matrixData, setMatrixData }}>
      {children}
    </MatrixContext.Provider>
  );
};
