import Question from "../../model/Question";
import classes from "../../styles/QuestionCard.module.css";
import Answers from "../answer/Answers";
import Card from "../card/Card";
type QuestionCardProps = {
  question: Question;
  callback: any;
  totalQuestions: number;
};
const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  return (
    <Card propClass={classes["question-card"]}>
      <p className={classes["question-number"]}>
        Question : {props.question.questioNo} / {props.totalQuestions}
      </p>
      <p className={classes["question"]}>Q : {props.question.question}</p>
      <div className="answers">
        <Answers answers={props.question.options} callback={props.callback} />
      </div>
    </Card>
  );
};
export default QuestionCard;
