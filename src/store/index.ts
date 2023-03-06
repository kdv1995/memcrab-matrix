import { createContext, useContext, useReducer } from "react";

interface IAppState {
  count: number;
}

const initialState: IAppState = {
  count: 0,
};

type ActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(state: IAppState, action: ActionType): IAppState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<ActionType>;
}

export const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
