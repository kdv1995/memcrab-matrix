import { MatrixProvider } from "context/matrixContext";
import { FC } from "react";
import { ReactRouter } from "router";
export const App: FC = () => {
  return (
    <>
      <MatrixProvider>
        <ReactRouter />
      </MatrixProvider>
    </>
  );
};
