function shuffleArray<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}
export default shuffleArray;

export enum GameStatus {
  NOTSTARTED,
  STARTED,
  GAMEOVER,
}
