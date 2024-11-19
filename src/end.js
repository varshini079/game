import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Game = ({ scores, players }) => {
  const player1 = players.player1;
  const player2 = players.player2;

  let winner;
  if (scores[player1] > scores[player2]) {
    winner = `${player1} is the winner! `;
  } else if (scores[player1] < scores[player2]) {
    winner = `${player2} is the winner! `;
  } else {
    winner = "It's a tie! ";
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" p={3}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Game Over
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {player1}: {scores[player1]} points
        </Typography>
        {scores[player1] === 0 && (
          <Typography variant="body2" color="error">
            {player1} scored 0 points!
          </Typography>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          {player2}: {scores[player2]} points
        </Typography>
        {scores[player2] === 0 && (
          <Typography variant="body2" color="error">
            {player2} scored 0 points!
          </Typography>
        )}
        <Typography variant="h5" color="primary" sx={{ mt: 3 }}>
          {winner}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Game;
