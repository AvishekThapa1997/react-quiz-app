import classes from "../../styles/Timer.module.css";
type TimerProps = {
  time: number;
};
const Timer: React.FC<TimerProps> = ({ time }) => {
  return (
    <div className={classes["timer-container"]}>
      <span className={classes["time"]}>
        {time % 10 !== 0 ? `0${time}` : time}
      </span>
    </div>
  );
};
export default Timer;
