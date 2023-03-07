import { MatrixProvider } from "context/matrixContext";
import { FC } from "react";
import { ReactRouter } from "router";
import { StoreProvider } from "store";
export const App: FC = () => {
  return (
    <>
      <StoreProvider>
        <MatrixProvider>
          <ReactRouter />
        </MatrixProvider>
      </StoreProvider>
    </>
  );
};
