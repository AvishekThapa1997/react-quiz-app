import React, { ReactNode } from "react";
import classes from "../../styles/Card.module.css";
type CardProps = {
  propClass: string;
  children: ReactNode;
};
const Card: React.FC<CardProps> = ({ propClass, children }) => {
  return <div className={`${classes["card"]} ${propClass}`}>{children}</div>;
};
export default Card;
