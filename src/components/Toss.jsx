// Toss.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Toss.module.css";

export const Toss = ({ playerName, playerTeam }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [tossResult, setTossResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTossCompleted, setIsTossCompleted] = useState(false);
  const [systemScore, setSystemScore] = useState(0);

  const computerTeam = "Binary Monster's"; // Computer team name
  const nameofPlayer = playerName.charAt(0).toUpperCase() + playerName.slice(1);
  const nameofTeam = playerTeam.charAt(0).toUpperCase() + playerTeam.slice(1);

  const handleToss = () => {
    setShowCircle(true);
    setIsAnimating(true);
    setIsFlipped(true);

    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        setTossResult(`${nameofPlayer} wins the toss!`);
      } else {
        setTossResult(`System wins the toss!`);
      }

      setIsAnimating(false);
      setShowCircle(false);
      setIsFlipped(false);
      setIsTossCompleted(true);
    }, 1000);
  };

  const handleChoice = (choice) => {
    const generatedScore = Math.floor(Math.random() * (50 - 15 + 1)) + 15; // Generate score between 15 to 50
    if (choice === "Bat") {
      setSystemScore(generatedScore);
      // Navigate to Batting component
      navigate("/batting", {
        state: { playerName: nameofPlayer, systemScore: generatedScore },
      });
    } else {
      // If the player chooses to bowl
      setSystemScore(generatedScore);
      alert(`System scored: ${generatedScore} runs!`);
      // Player will now bat after bowling
      navigate("/batting", {
        state: { playerName: nameofPlayer, systemScore: generatedScore },
      });
    }
  };

  return (
    <div className={styles.TossDiv}>
      <div>
        <img src="public\player.png" alt="Player" />
        <div className={styles.PlayerDetails}>
          <span>Player Name: {nameofPlayer}</span>
          <span>Player Team: {nameofTeam}</span>
        </div>
      </div>

      <div className={styles.tossButton}>
        {showCircle && (
          <div
            className={`${styles.circle} ${isAnimating ? styles.animate : ""} ${
              isFlipped ? styles.flip : ""
            }`}
          ></div>
        )}
        {tossResult && (
          <div className={`${styles.tossResult} alert alert-success`}>
            {tossResult}
          </div>
        )}
        {!isTossCompleted ? (
          <button
            onClick={handleToss}
            className={`${styles.tossbtn} btn btn-primary`}
          >
            Toss
          </button>
        ) : (
          <div className={`${styles.winnerChoiceBtn}`}>
            {tossResult.startsWith(nameofPlayer) ? ( // If player wins the toss
              <>
                <button
                  onClick={() => handleChoice("Bat")}
                  className={`${styles.choiceBtn} btn btn-danger`}
                >
                  Bat
                </button>
                <button
                  onClick={() => handleChoice("Ball")}
                  className={`${styles.choiceBtn} btn btn-warning`}
                >
                  Ball
                </button>
              </>
            ) : (
              <div>
                <p>System chose to Bat.</p>{" "}
                <button
                  onClick={() => handleChoice("Ball")}
                  className={`${styles.choiceBtn} btn btn-success`}
                >
                  System Score
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <img src="public\computer.png" alt="Computer" />
        <div className={styles.PlayerDetails}>
          <span>Player Name: System</span>
          <span>Player Team: {computerTeam}</span>
        </div>
      </div>
    </div>
  );
};
