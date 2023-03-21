import { FC } from "react";
import styles from "./Button.module.scss";
interface IButtonProps {
  className: string;
  title: string;
  onClick: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: FC<IButtonProps> = ({
  type,
  title,
  className,
  onClick,
}) => (
  <button type={type} className={styles[className]} onClick={onClick}>
    {title}
  </button>
);
