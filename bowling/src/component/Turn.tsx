import React from "react";

type TurnProps = {
  turnIndex: number;
  turn: number[];
  currentTurn: number;
};

const Turn: React.FC<TurnProps> = ({ turnIndex, turn, currentTurn }) => {
  const wedge1 = turn[0] || "-";
  const wedge2 = turn[1] || "-";
  const wedge3 = turn[2] || "-";
  const turnScore = turn.reduce((sum, wedge) => sum + wedge, 0);

  const turnClassName = turnIndex === currentTurn - 1 ? "turn active" : "turn";
  return (
    <div className={turnClassName}>
      <h3>Turn {turnIndex + 1}</h3>
      <p className="hit">Wedge1: {wedge1}</p>
      <p className="hit">Wedge2: {wedge2}</p>
      {turnIndex === 9 && <p className="hit">Wedge3: {wedge3}</p>}
      <p className="hit">Turn Score: {turnScore}</p>
    </div>
  );
};

export default Turn;
