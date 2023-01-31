import React from "react";
import { nanoid } from "nanoid";

const Die = ({ value, isHeld, holdDice }) => {
  return (
    <div className={`die ${isHeld && "is-die-held"}`} onClick={holdDice}>
      <h2 className="die-num">{value}</h2>
    </div>
  );
};

export default Die;

export const generateDiceNum = () => {
  const num = [];

  for (let i = 0; i < 10; i++) {
    const randomNum = Math.ceil(Math.random() * 6);
    num.push({ value: randomNum, isHeld: false, id: nanoid() });
  }
  return num;
};
