import { FC } from "react";
import { MatrixProvider } from "./context/matrixContext";
import { ReactRouter } from "./router";
const App: FC = () => {
  return (
    <>
      <MatrixProvider>
        <ReactRouter />
      </MatrixProvider>
    </>
  );
};
export default App;
