import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Player = ({ setPlayers }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStart = () => {
    if (player1 && player2) setPlayers({ player1, player2 });
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', textAlign: 'center', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Enter Player Names
      </Typography>
      <TextField
        fullWidth
        label="Player 1"
        variant="outlined"
        margin="normal"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <TextField
        fullWidth
        label="Player 2"
        variant="outlined"
        margin="normal"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleStart}>
        Start Game
      </Button>
    </Box>
  );
};

export default Player;
