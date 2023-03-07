type Action =
  | { type: "SET_MATRIX"; payload: [] }
  | { type: "SET_INCREMENT"; payload: number }
  | { type: "SET_NUMBER_TO_CUT"; payload: number }
  | { type: "SET_CLOSEST_VALUES"; payload: number }
  | { type: "SET_CLEAR_VALUES" }
  | { type: "SET_NEW_ROW_DATA"; payload: {} }
  | { type: "SET_ROW_PERCENTAGE" }
  | { type: "SET_CLEAR_DEPOSIT" }
  | { type: "SET_NEW_ROW" }
  | { type: "SET_DELETE_ROW"; payload: string };

type State = {
  matrix: [];
  newRowData: {};
  numberToShow: number;
};
