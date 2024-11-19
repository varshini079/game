import React, { useState } from 'react';
import Category from './category'; 
import Player from './home';
import Game from './end';
import Question from './question';

const App = () => {
  const [players, setPlayers] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAnswer = (correct, difficulty) => {
    const points = getPointsBasedOnDifficulty(difficulty); 
    const currentPlayer = players.player1;

    if (correct) {
      updateScores(currentPlayer, points);
    }

    setGameOver(true); 
  };

  const getPointsBasedOnDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 10;
      case 'medium':
        return 15;
      case 'hard':
        return 20;
      default:
        return 0;
    }
  };

  const updateScores = (player, points) => {
    setScores((prevScores) => ({
      ...prevScores,
      [player]: (prevScores[player] || 0) + points,
    }));
  };

  if (!players) return <Player setPlayers={setPlayers} />;
  if (gameOver) return <Game scores={scores} players={players} />;

  return (
    <>
      {!selectedCategory ? (
        <Category onCategorySelect={handleCategorySelect} />
      ) : (
        <Question
          player={players.player1}
          selectedCategory={selectedCategory}
          onAnswer={handleAnswer}
          onFinish={() => setGameOver(true)}
        />
      )}
    </>
  );
};

export default App;
