import { Difficulty } from "../api/api";

interface Question {
  questioNo: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
}
export default Question;
