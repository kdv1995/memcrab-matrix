import { FC } from "react";
import { MatrixProvider } from "../context/matrixContext";
import { ReactRouter } from "../router";
export const App: FC = () => {
  return (
    <>
      <MatrixProvider>
        <ReactRouter />
      </MatrixProvider>
    </>
  );
};
