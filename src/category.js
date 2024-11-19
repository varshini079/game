import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';

const Category = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await res.json();

      const uniqueCategories = Array.from(
        new Set(data.map((question) => question.category.replace(/_/g, ' '))) 
      );

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Categories
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          padding: 2,
          borderRadius: 2,
          boxShadow: 3, 
          width:600
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => onCategorySelect(category)}
            sx={{ margin: 1 }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Category;
