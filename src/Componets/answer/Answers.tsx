import classes from "../../styles/Answers.module.css";
type AnswerProps = {
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const Answers: React.FC<AnswerProps> = ({ answers, callback }) => {
  return (
    <ul className={classes["answers"]}>
      {answers.map((answer, index) => {
        return (
          <li
            key={answer}
            className={`${classes["answer-item"]} ${classes["answer-item"]}-${index}`}
          >
            <button
              className={classes["answer-text"]}
              value={answer}
              onClick={callback}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
