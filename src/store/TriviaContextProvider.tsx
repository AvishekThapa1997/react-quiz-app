import React, { createContext, useReducer } from "react";
import Question from "../model/Question";
import { GameStatus } from "../util/util";
import TriviaReducer, { Dispatch } from "./triviaReducer";
export type TriviaContextType = {
  loading: boolean;
  questions: Question[];
  number: number;
  score: number;
  timer: number;
  gameStatus: GameStatus;
};
export const INITIAL_STATE: TriviaContextType = {
  loading: false,
  questions: [],
  number: -1,
  score: 0,
  timer: 10,
  gameStatus: GameStatus.NOTSTARTED,
};
export const TriviaContext = createContext<
  [TriviaContextType, Dispatch] | null
>(null);
const TriviaContextProvider: React.FC = (props) => {
  return (
    <TriviaContext.Provider value={useReducer(TriviaReducer, INITIAL_STATE)}>
      {props.children}
    </TriviaContext.Provider>
  );
};
export default TriviaContextProvider;
