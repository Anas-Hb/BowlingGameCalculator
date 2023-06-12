import React, { useState, useEffect } from "react";
import Turn from "./Turn";
import BallButton from "./BallButton";
const BowlingGameCalculator: React.FC = () => {
  const [turns, setTurns] = useState<number[][]>(
    Array.from({ length: 10 }, () => [])
  );
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentBall, setCurrentBall] = useState(1);
  const [remainingWedges, setRemainingWedges] = useState(10);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const fetchTotalScore = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/calculate-total-score",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ turns }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to calculate total score");
        }

        const data = await response.json();
        setTotalScore(data.score);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalScore();
  }, [turns]);

  const ball = (wedge: number) => {
    const updatedTurns = [...turns];
    const turnIndex = currentTurn - 1;

    updatedTurns[turnIndex] = [...updatedTurns[turnIndex], wedge];
    setTurns(updatedTurns);

    setRemainingWedges(remainingWedges - wedge);

    if (currentTurn < 10) {
      if (currentBall === 1 && wedge < 10) {
        setCurrentBall(2);
      } else {
        setCurrentTurn(currentTurn + 1);
        setCurrentBall(1);
        setRemainingWedges(10);
      }
    } else if (currentTurn === 10 && currentBall === 1) {
      if (wedge === 10) {
        setCurrentBall(2);
        setRemainingWedges(10);
      } else {
        setCurrentBall(2);
        setRemainingWedges(10 - wedge);
      }
    } else if (currentTurn === 10 && currentBall === 2) {
      setCurrentBall(3);
      setRemainingWedges(10);
    }
  };

  return (
    <div>
      <h1>Bowling Game Calculator</h1>
      <div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((wedge) => (
          <BallButton
            key={wedge}
            wedge={wedge}
            onBall={ball}
            remainingWedges={remainingWedges}
            currentTurn={currentTurn}
            currentBall={currentBall}
          />
        ))}
      </div>
      <div className="container">
        {turns.map((turn, index) => (
          <Turn key={index} turnIndex={index} turn={turn} />
        ))}
      </div>
      <div className="info">
        <h2>Turn: {currentTurn}</h2>
        <h2>Ball: {currentBall}</h2>
        <h2>Total Score: {totalScore}</h2>
      </div>
    </div>
  );
};

export default BowlingGameCalculator;
