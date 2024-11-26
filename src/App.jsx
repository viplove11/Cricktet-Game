// App.jsx

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NameInput } from "./components/NameInput";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import Router components
import { Toss } from "./components/Toss";
import { Batting } from "./components/Batting"; // Import the Batting component

function App() {
  // state for player Name
  const [playerName, setPlayerName] = useState("");
  // state for player Team
  const [playerTeam, setPlayerTeam] = useState("");

  const handleNameChange = (event) => {
    const name = event.target.value;
    console.log(name);
    setPlayerName(name);
  };

  const handleTeamChange = (event) => {
    const name = event.target.value;
    console.log(name);
    setPlayerTeam(name);
  };

  // Use useNavigate inside App component
  const navigate = useNavigate(); // Initialize useNavigate

  const createUserButtonHandle = (event) => {
    event.preventDefault();
    console.log("Player created:", playerName);
    console.log("Player Team:", playerTeam);
    
    // Navigate to the Toss component
    navigate("/toss");
  };

  return (
    <div className="mainContainer">
      <p className="logo">
        Gully<span className="logoSpan">Crick</span>
      </p>
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <NameInput
                handleNameChange={handleNameChange}
                createUserButtonHandle={createUserButtonHandle} // Ensure this name matches
                handleTeamChange={handleTeamChange}
              />
            } 
          />
          <Route 
            path="/toss" 
            element={
              <Toss playerName={playerName} playerTeam={playerTeam} />
            } 
          />
          <Route 
            path="/batting" 
            element={<Batting />} 
          />
        </Routes>
      </div>
    </div>
  );
}

// Wrap App with Router in a separate component
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;