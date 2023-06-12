import React from "react";

type BallButtonProps = {
  wedge: number;
  onBall: (wedge: number) => void;
  remainingWedges: number;
  currentTurn: number;
  currentBall: number;
};

const BallButton: React.FC<BallButtonProps> = ({
  wedge,
  onBall,
  remainingWedges,
  currentTurn,
  currentBall,
}) => {
  const isDisabled =
    (currentTurn < 10 && wedge > remainingWedges) ||
    (currentTurn === 10 &&
      currentBall === 1 &&
      wedge > remainingWedges &&
      remainingWedges !== 0) ||
    (currentTurn === 10 && wedge > remainingWedges) ||
    (currentTurn === 10 &&
      currentBall === 3 &&
      (remainingWedges < wedge || remainingWedges === 0));

  return (
    <button
      onClick={() => {
        onBall(wedge);
        console.log(
          "currentTurn:" + currentTurn,
          "currentBall:" + currentBall,
          "wedge:" + wedge,
          "remainingWedges:" + remainingWedges
        );
      }}
      disabled={isDisabled}
      className="ball-button"
    >
      {wedge}
    </button>
  );
};

export default BallButton;
