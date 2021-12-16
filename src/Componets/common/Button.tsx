import classes from "../../styles/Button.module.css";
type ButtonProps = {
  propClass: string;
  text: string;
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button: React.FC<ButtonProps> = ({ propClass, text, callback }) => {
  return (
    <div className={classes["btn-control"]}>
      <button className={`${propClass} ${classes["btn"]}`} onClick={callback}>
        {text}
      </button>
    </div>
  );
};
export default Button;
