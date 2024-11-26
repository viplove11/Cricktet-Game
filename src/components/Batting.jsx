import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import styles from "./Batting.module.css";

export const Batting = () => {
  const location = useLocation(); // Initialize useLocation
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { playerName, systemScore } = location.state; // Get state from navigation
  const [playerScore, setPlayerScore] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(12);
  const [playerRuns, setPlayerRuns] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(Array(12).fill(false)); // Array to track disabled buttons
  const [nextBall, setNextBall] = useState(0); // Track the next ball that can be played

  const handlePlayerBatting = (ballNumber) => {
    if (ballsLeft > 0) {
      if (ballNumber !== nextBall) {
        // Check if the clicked button is the next one
        alert(`**You must play ball ${nextBall + 1} before this!**`);
        return;
      }

      const runOptions = [0, 1, 2, 3, 4, 6]; // Array of possible runs

      const runScored =
        runOptions[Math.floor(Math.random() * runOptions.length)];
      setPlayerScore((prev) => prev + runScored);
      setPlayerRuns((prev) => {
        const newRuns = [...prev];
        newRuns[ballNumber] = runScored; // Store the score for this ball
        return newRuns;
      });
      setDisabledButtons((prev) => {
        const newDisabled = [...prev];
        newDisabled[ballNumber] = true; // Disable the clicked button
        return newDisabled;
      });
      setBallsLeft((prev) => prev - 1); // Decrease balls left
      setNextBall((prev) => prev + 1); // Move to the next ball

      // Check if innings is over after the last ball
      if (ballsLeft === 1) {
        alert(`**Innings over! Your Total Score: ${playerScore + runScored}**`);
        compareScores(playerScore + runScored);
      }
    } else {
      alert(`**Innings over! Your Total Score: ${playerScore}**`);
      compareScores(playerScore);
    }
  };

  const compareScores = (finalPlayerScore) => {
    if (finalPlayerScore > systemScore) {
      alert(`**${playerName} wins!**`);
    } else if (finalPlayerScore < systemScore) {
      alert(`**System wins!**`);
    } else {
      alert(`**It's a tie!**`);
    }
  };

  const handleGoToMainPage = () => {
    navigate("/"); // Redirect to the main page (adjust the path as needed)
  };

  return (
    <div className={styles.BattingDiv}>
      <h3 className={`${styles.PlayerName}`}>{playerName}'s Batting 🏏</h3>
      <div className={`${styles.runDetails}`}>
        <div className={`${styles.bowlButtonDiv}`}>
          {Array.from({ length: 12 }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePlayerBatting(index)}
              className={`${styles.batButton} btn btn-primary`}
              disabled={disabledButtons[index]} // Disable button based on state
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className={`${styles.totalRunsDiv}`}>
          <label>
            Total Runs:{" "}
            <span className={`${styles.playerScored}`}>{playerScore}</span>
          </label>{" "}
          <br />
          <label>
            Targetted Score:{" "}
            <span className={`${styles.playerScored}`}>{systemScore}</span>
          </label>
        </div>
        <div>
          <div className={`${styles.runScored}`}>
            {playerRuns.map((run, index) => (
              <label key={index} className={`${styles.runScoreLabel}`}>
                {run !== undefined ? run : 0}
              </label>
            ))}
          </div>
        </div>
      </div>

      {ballsLeft === 0 ? (
        <button
          type="button"
          className={`${styles.mainPageRedirectButton} btn btn-warning`}
          onClick={handleGoToMainPage}
        >
          Restart Game
        </button>
      ) : null}
    </div>
  );
};
