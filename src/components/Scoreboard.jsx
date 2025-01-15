import React from "react";

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Best Score: {highScore}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default ScoreBoard;

//do the best score. 
