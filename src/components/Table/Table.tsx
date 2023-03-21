import styles from "./Table.module.scss";
interface ITableProps {
  children: React.ReactNode;
}
export const Table = ({ children }: ITableProps) => (
  <table className={styles.table}>{children}</table>
);
