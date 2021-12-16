import { GameStatus } from "../util/util";
import ACTIONS from "./triviaActions";
import { INITIAL_STATE, TriviaContextType } from "./TriviaContextProvider";
type TriviaReducerType<S, A> = (prevState: S, action: A) => S;
export type Dispatch = (action: ACTIONS) => void;
const TriviaReducer: TriviaReducerType<TriviaContextType, ACTIONS> = (
  prevState,
  action
) => {
  switch (action.type) {
    case "loading": {
      return { ...prevState, loading: true };
    }
    case "success": {
      return {
        ...prevState,
        questions: action.payload,
        number: 0,
        gameStatus: GameStatus.STARTED,
        loading: false,
      };
    }
    case "next": {
      return {
        ...prevState,
        number: prevState.number + 1,
        timer: 10,
      };
    }
    case "update_score": {
      return {
        ...prevState,
        score: action.payload,
        gameStatus: GameStatus.GAMEOVER,
        number: -1,
        questions: [],
      };
    }
    case "reset_game": {
      return {
        ...INITIAL_STATE,
      };
    }
    case "countdown": {
      return {
        ...prevState,
        timer: --prevState.timer,
      };
    }
    default: {
      return prevState;
    }
  }
};
export default TriviaReducer;
