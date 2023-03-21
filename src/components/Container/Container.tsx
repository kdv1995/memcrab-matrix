import { FC } from "react";
import styles from "./Container.module.scss";

interface IContainterProps {
  children: React.ReactNode;
  variant: string;
}
export const Container: FC<IContainterProps> = ({ children, variant }) => (
  <div className={styles[variant]}>{children}</div>
);
