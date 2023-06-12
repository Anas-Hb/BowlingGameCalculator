const calculateTotalScore = (turns) => {
    let score = 0;
  
    for (let turn = 0; turn < 10; turn++) {
      const currentTurn = turns[turn];
  
      if (!currentTurn) {
        break;
      }
  
      const turnScore = calculateTurnScore(currentTurn);
  
      score += turnScore;
  
      if (turn < 9) {
        const nextTurn = turns[turn + 1];
  
        if (currentTurn.length === 1 && turnScore === 10) {
          if (nextTurn && nextTurn.length >= 2) {
            score += nextTurn[0] + (nextTurn[1] || 0);
          } else if (nextTurn && nextTurn.length === 1) {
            const nextNextTurn = turns[turn + 2];
            if (nextNextTurn && nextNextTurn.length >= 1) {
              score += nextTurn[0] + nextNextTurn[0];
            }
          }
        } else if (currentTurn.length === 2 && turnScore === 10) {
          if (nextTurn && nextTurn.length >= 1) {
            score += nextTurn[0];
          }
        }
      } else if (turn === 9) {
        if (
          currentTurn.length === 2 &&
          (currentTurn[0] === 10 || currentTurn[0] + currentTurn[1] === 10)
        ) {
          const bonusBalls = currentTurn.slice(2);
          for (const ball of bonusBalls) {
            score += ball;
          }
        }
      }
    }
  
    return score;
  };
  
  
  const calculateTurnScore = (turn) => {
    return turn.reduce((sum, ball) => sum + ball, 0);
  };
  
  module.exports = { calculateTotalScore };
  