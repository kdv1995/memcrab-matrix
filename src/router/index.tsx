import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Matrix } from "../components";
import { MatrixForm } from "../components/MatrixForm";
import { routes } from "../constants/routes";
import { HomePage } from "../pages";

export const ReactRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.HomePage.path} element={<HomePage />} />
      <Route path={routes.MatrixForm.path} element={<MatrixForm />} />
      <Route path={routes.Matrix.path} element={<Matrix />} />
    </Routes>
  </BrowserRouter>
);
