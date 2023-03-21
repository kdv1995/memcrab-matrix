interface ITableBodyProps {
  children: React.ReactNode;
}
export const TableBody = ({ children }: ITableBodyProps) => (
  <tbody>{children}</tbody>
);
