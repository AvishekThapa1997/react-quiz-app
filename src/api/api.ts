import Question from "../model/Question";
import shuffleArray from "../util/util";
export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}
const fetchQuestion = async (
  totalquestions: number,
  difficulty: Difficulty
) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${totalquestions}&type=multiple&difficulty=${difficulty}`
  );
  const data = await response.json();
  const questions: Question[] = data.results.map((item: any, index: number) => {
    const question: Question = {
      questioNo: index + 1,
      question: item.question,
      options: shuffleArray([...item.incorrect_answers, item.correct_answer]),
      correctAnswer: item.correct_answer,
      difficulty:
        item.difficulty === "easy"
          ? Difficulty.EASY
          : item.difficulty === "medium"
          ? Difficulty.MEDIUM
          : Difficulty.HARD,
    };
    return question;
  });
  return questions;
};
export default fetchQuestion;
