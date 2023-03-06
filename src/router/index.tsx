import { Matrix } from "components/Matrix";
import { MatrixForm } from "components/MatrixForm";
import { routes } from "constants/routes";
import { HomePage } from "pages";
import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const ReactRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HomePage.path} element={<HomePage />} />
        <Route path={routes.MatrixForm.path} element={<MatrixForm />} />
        <Route path={routes.Matrix.path} element={<Matrix />} />
      </Routes>
    </BrowserRouter>
  );
};
