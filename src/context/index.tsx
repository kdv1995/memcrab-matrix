import { createContext, FC, useEffect, useState } from "react";

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
  useEffect(() => {
    localStorage.setItem("matrixData", JSON.stringify(matrixData));
  }, [matrixData]);

  return (
    <MatrixContext.Provider value={{ matrixData, setMatrixData }}>
      {children}
    </MatrixContext.Provider>
  );
};
