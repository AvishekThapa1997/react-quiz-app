import React, { useEffect, useState, useCallback, useContext } from "react";
import QuestionCard from "./Componets/question/QuestionCard";
import fetchQuestion, { Difficulty } from "./api/api";
import { GameStatus } from "./util/util";
import Button from "./Componets/common/Button";
import classes from "./styles/App.module.css";
import Timer from "./Componets/timer/Timer";
import Modal from "./Componets/modal/Modal";
import { TriviaContext } from "./store/TriviaContextProvider";

// type ACTIONS =
//   | {
//       type: "loading";
//     }
//   | {
//       type: "success";
//       payload: Question[];
//     }
//   | {
//       type: "next";
//     }
//   | {
//       type: "update_score";
//       payload: number;
//     }
//   | {
//       type: "reset_game";
//     };
// type Reducer<S, A> = (prevState: S, action: A) => S;
// type TriviaState = {
//   loading: boolean;
//   questions: Question[];
//   number: number;
//   score: number;
//   gameStatus: GameStatus;
// };
// const INITIAL_STATE: TriviaState = {
//   loading: false,
//   questions: [],
//   number: -1,
//   score: 0,
//   gameStatus: GameStatus.NOTSTARTED,
// };
// const TriviaReducer: Reducer<typeof INITIAL_STATE, ACTIONS> = (
//   prevState: TriviaState,
//   action: ACTIONS
// ) => {
//   switch (action.type) {
//     case "loading": {
//       return { ...prevState, loading: true };
//     }
//     case "success": {
//       return {
//         ...prevState,
//         questions: action.payload,
//         number: 0,
//         gameStatus: GameStatus.STARTED,
//         loading: false,
//       };
//     }
//     case "next": {
//       return {
//         ...prevState,
//         number: prevState.number + 1,
//       };
//     }
//     case "update_score": {
//       return {
//         ...prevState,
//         score: action.payload,
//         gameStatus: GameStatus.GAMEOVER,
//         number: -1,
//         questions: [],
//       };
//     }
//     case "reset_game": {
//       return {
//         ...INITIAL_STATE,
//       };
//     }
//     default: {
//       return prevState;
//     }
//   }
// };
const answers: string[] = [];
const TOTAL_QUESTIONS = 10;
const App = () => {
  const [state, dispatch] = useContext(TriviaContext)!;
  // const [state, dispatch] = useReducer<typeof TriviaReducer>(
  //   TriviaReducer,
  //   INITIAL_STATE
  // );
  const validateScore = useCallback(() => {
    let finalScore = 0;
    state.questions.forEach((question, index) => {
      finalScore += question.correctAnswer === answers[index] ? 10 : 0;
    });
    dispatch({
      type: "update_score",
      payload: finalScore,
    });
  }, [state.questions, dispatch]);
  const nextQuestion = useCallback(() => {
    if (state.number < state.questions.length) {
      dispatch({
        type: "next",
      });
      return;
    }
    validateScore();
  }, [state.number, state.questions.length, validateScore, dispatch]);
  // const [timer, setTimer] = useState(10);
  const [modalVisibile, setModalVisibility] = useState(false);

  useEffect(() => {
    let timeInterval: any;
    if (
      state.number >= 0 &&
      state.number < state.questions.length &&
      !modalVisibile
    ) {
      timeInterval = setInterval(() => {
        if (state.timer <= 0 && state.number === state.questions.length - 1) {
          validateScore();
          return;
        }
        if (state.timer === 1 && state.number < state.questions.length - 1) {
          nextQuestion();
          return;
        }
        dispatch({
          type: "countdown",
        });
      }, 1000);
    }
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [
    state.number,
    state.questions,
    nextQuestion,
    validateScore,
    modalVisibile,
    dispatch,
    state.timer,
  ]);
  const startTrivia = async () => {
    dispatch({
      type: "loading",
    });
    try {
      const questions = await fetchQuestion(TOTAL_QUESTIONS, Difficulty.EASY);
      dispatch({
        type: "success",
        payload: questions,
      });
    } catch (err) {}
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentAnswer = e.currentTarget.value;
    answers.push(currentAnswer);
    if (state.number === state.questions.length - 1) {
      validateScore();
      return;
    }
    nextQuestion();
  };
  const startNewGame = () => {
    if (modalVisibile) {
      setModalVisibility(false);
    }
    dispatch({
      type: "reset_game",
    });
    startTrivia();
    //Reset Timing
  };
  const closeModalHandler = () => {
    setModalVisibility(false);
  };
  const resetGameHandler = () => {
    if (state.gameStatus === GameStatus.STARTED) {
      setModalVisibility(true);
      return;
    }
    startNewGame();
  };
  return (
    <div className={classes["container"]}>
      {/* <Transition
        in={modalVisibile}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      > */}
      <Modal
        closeModal={closeModalHandler}
        newGameHandler={startNewGame}
        visibility={modalVisibile}
      />
      {/* </Transition> */}
      <h1 className={classes["primary-heading"]}>React Quiz</h1>
      {state.gameStatus === GameStatus.NOTSTARTED && !state.loading && (
        <Button
          propClass={`${classes["btn-start"]} ${classes["center"]}`}
          callback={startTrivia}
          text="Start"
        />
      )}
      {state.gameStatus === GameStatus.GAMEOVER && (
        <p className={classes["score"]}>Score : {state.score}</p>
      )}
      {state.loading && (
        <p className={`${classes["btn-start"]} ${classes["center"]}`}>
          Loading Questions...
        </p>
      )}
      {state.gameStatus === GameStatus.STARTED && <Timer time={state.timer} />}
      {state.gameStatus === GameStatus.STARTED &&
        state.questions.length > 0 && (
          <QuestionCard
            totalQuestions={TOTAL_QUESTIONS}
            question={state.questions[state.number]}
            callback={checkAnswer}
          />
        )}

      {(state.gameStatus === GameStatus.STARTED ||
        state.gameStatus === GameStatus.GAMEOVER) && (
        <Button
          propClass={`${classes["btn-new"]}`}
          callback={resetGameHandler}
          text={
            state.gameStatus === GameStatus.STARTED
              ? "RESTART"
              : "PLAY A NEW GAME"
          }
        />
      )}
    </div>
  );
};

export default App;
