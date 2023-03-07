import { routes } from "constants/routes";
import { MatrixContext } from "context/matrixContext";
import { FC, MouseEventHandler, useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./MatrixForm.scss";

interface FormData {
  [key: string]: number;
}
export const MatrixForm: FC = () => {
  const navigate = useNavigate();
  const handleNavigateToHomePage: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(routes.HomePage.path);
  };
  const { setMatrixData, setHighlightAmount } = useContext(MatrixContext);
  const [formData, setFormData] = useState<FormData>({
    rows: 0,
    columns: 0,
    highlightAmount: 0,
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMatrixData(formData);
    setHighlightAmount(formData.highlightAmount);
    navigate(routes.Matrix.path, { state: { isSubmitted: true } });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: Number(event.target.value),
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="matrix-form">
        <h2 className="matrix-form__title">Data to collect</h2>
        <label className="matrix-form__label" htmlFor="rows">
          Rows:
          <input
            className="matrix-form__input"
            type="range"
            name="rows"
            min={0}
            max={100}
            value={formData.rows}
            onChange={(e) => handleInputChange(e)}
          />
          <span>{formData.rows}</span>
        </label>
        <label className="matrix-form__label" htmlFor="columns">
          Columns:
          <input
            className="matrix-form__input"
            type="range"
            name="columns"
            min={0}
            max={100}
            value={formData.columns}
            onChange={(e) => handleInputChange(e)}
          />
          <span>{formData.columns}</span>
        </label>
        <label className="matrix-form__label" htmlFor="highlightAmount">
          Higlight amount:
          <input
            className="matrix-form__input"
            type="range"
            name="highlightAmount"
            min={0}
            max={100}
            value={formData.highlightAmount}
            onChange={(e) => handleInputChange(e)}
          />
          <span>{formData.highlightAmount}</span>
        </label>
        <div className="matrix-form-button-container">
          <button type="submit" className="matrix-form__button_create">
            Create matrix
          </button>
          <button
            onClick={handleNavigateToHomePage}
            className="matrix-form__button_back"
          >
            Go home
          </button>
        </div>
      </form>
    </>
  );
};
