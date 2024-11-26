// NameInput.jsx

import React from "react";
import styles from "./NameInput.module.css";

export const NameInput = ({ handleNameChange, createUserButtonHandle, handleTeamChange }) => {
  return (
    <div className={`${styles.NameInput}`}>
      <form onSubmit={createUserButtonHandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Player Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter player name"
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Player Team 
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter team name"
            onChange={handleTeamChange} required
          />
        </div>

        <button type="submit" className={`${styles.createUserbtn} btn btn-primary`}>
          Create Player 
        </button>
      </form>
    </div>
  );
};