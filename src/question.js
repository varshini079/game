import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';

const Question = ({ player, onAnswer, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await res.json();
        const formattedQuestions = data.map((q) => ({
          question: q.question,
          options: [
            ...q.incorrectAnswers.map((text) => ({ text, correct: false })),
            { text: q.correctAnswer, correct: true },
          ].sort(() => Math.random() - 0.5),
          category: q.category,
          difficulty: q.difficulty,
        }));
        setQuestions(formattedQuestions);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoading(false); 
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    onAnswer(isCorrect); 
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1); 
    } else {
      onFinish(); 
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h6">Loading questions...</Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h6" sx={{ position: 'absolute', top: 10, right: 10 }}>
        Category: {currentQuestion.category} | Difficulty: {currentQuestion.difficulty}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {player}'s Turn
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {currentQuestion.question}
        </Typography>
        <Box>
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{ margin: 1 }}
              onClick={() => handleAnswer(option.correct)}
            >
              {option.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Question;
