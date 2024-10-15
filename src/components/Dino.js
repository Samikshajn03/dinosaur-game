import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

function Dino() {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  const jump = () => {
    if (dinoRef.current && !dinoRef.current.classList.contains("jump")) {
      dinoRef.current.classList.add("jump");
      setTimeout(() => {
        if (dinoRef.current) {
          dinoRef.current.classList.remove("jump");
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (!gameRunning) return;

    
    cactusRef.current.classList.add("cactus-animation");

    const gameLoop = setInterval(() => {
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top"),
        10
      );
      const cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left"),
        10
      );

      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        alert(`Game Over! Your Score: ${Math.floor(score)}`);
        setScore(0);
        setGameRunning(false);
        cactusRef.current.classList.remove("cactus-animation");
        cactusRef.current.style.left = "580px"; 
      } else {
        setScore(prevScore => prevScore + 0.1);
      }
    }, 10);

    return () => {
      clearInterval(gameLoop);
      cactusRef.current.classList.remove("cactus-animation");
    };
  }, [gameRunning, score]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameRunning) {
        setGameRunning(true);
        setScore(0);
        cactusRef.current.style.left = "580px"; 
      }
      if (e.key === " ") {
        jump();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", jump);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", jump);
    };
  }, [gameRunning]);

  return (
    <div className="game">
      <div>Score: {Math.floor(score)}</div>
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
      {!gameRunning && (
        <div className="start-message">Press any key to start the game</div>
      )}
    </div>
  );
}

export default Dino;
