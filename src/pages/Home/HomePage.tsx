import { FC, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import "./HomePage.scss";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const handleNavigateMatrixForm: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(routes.MatrixForm.path);
  };

  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__title">Matrix application</div>
        <button className="homepage__button" onClick={handleNavigateMatrixForm}>
          Matrix form
        </button>
      </div>
    </div>
  );
};
