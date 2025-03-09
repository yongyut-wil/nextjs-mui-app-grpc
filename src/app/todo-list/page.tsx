'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  Grid,
  Stack,
  Fade,
  Grow,
  useTheme,
  alpha
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AppHeader from '@/components/AppHeader';
import { useRouter } from 'next/navigation';

// Define color palette
const colors = {
  fruit: {
    main: 'rgb(255, 45, 85)', // Vibrant pink/red
    light: 'rgb(255, 88, 116)',
    dark: 'rgb(210, 30, 65)',
    gradient: 'linear-gradient(135deg, rgb(255, 45, 85) 0%, rgb(255, 99, 71) 100%)',
    contrastText: '#fff'
  },
  vegetable: {
    main: 'rgb(52, 199, 89)', // Vibrant green
    light: 'rgb(97, 217, 124)',
    dark: 'rgb(40, 160, 70)',
    gradient: 'linear-gradient(135deg, rgb(52, 199, 89) 0%, rgb(88, 216, 163) 100%)',
    contrastText: '#fff'
  },
  background: {
    light: 'rgb(250, 252, 255)',
    dark: 'rgb(10, 18, 30)',
    paper: '#fff',
    gradient: 'linear-gradient(135deg, rgba(240,249,255,1) 0%, rgba(249,250,255,1) 100%)'
  }
};

interface FoodItem {
  type: 'Fruit' | 'Vegetable';
  name: string;
  id?: string; // Unique identifier
  moveTimestamp?: number; // Timestamp when item was moved to its type column
}

interface ItemWithTimestamp extends FoodItem {
  moveTimestamp: number;
}

export default function FoodSortingPage() {
  const router = useRouter();
  const theme = useTheme();
  const [mainList, setMainList] = useState<FoodItem[]>([]);
  const [fruitColumn, setFruitColumn] = useState<ItemWithTimestamp[]>([]);
  const [vegetableColumn, setVegetableColumn] = useState<ItemWithTimestamp[]>([]);
  // const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [force, setForce] = useState(0); // For forcing re-renders

  // Initialize the list
  useEffect(() => {
    const initialFoodItems: FoodItem[] = [
      { type: 'Fruit', name: 'Apple', id: 'apple' },
      { type: 'Vegetable', name: 'Broccoli', id: 'broccoli' },
      { type: 'Vegetable', name: 'Mushroom', id: 'mushroom' },
      { type: 'Fruit', name: 'Banana', id: 'banana' },
      { type: 'Vegetable', name: 'Tomato', id: 'tomato' },
      { type: 'Fruit', name: 'Orange', id: 'orange' },
      { type: 'Fruit', name: 'Mango', id: 'mango' },
      { type: 'Fruit', name: 'Pineapple', id: 'pineapple' },
      { type: 'Vegetable', name: 'Cucumber', id: 'cucumber' },
      { type: 'Fruit', name: 'Watermelon', id: 'watermelon' },
      { type: 'Vegetable', name: 'Carrot', id: 'carrot' },
    ];
    
    // Add unique IDs if not present
    setMainList(initialFoodItems.map(item => ({
      ...item,
      id: item.id || `${item.name.toLowerCase()}-${Date.now()}`
    })));
  }, []);



  // Force UI updates for the countdown timer every 250ms
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (fruitColumn.length > 0 || vegetableColumn.length > 0) {
        setForce(prev => prev + 1);
      }
    }, 250);
    
    return () => clearInterval(timerInterval);
  }, [fruitColumn.length, vegetableColumn.length]);

  // Check for items that need to return to main list
  useEffect(() => {
    const checkItemsToReturn = () => {
      const now = Date.now();
      
      // Check fruits column
      const fruitsToReturn = fruitColumn.filter(
        item => item.moveTimestamp && now - item.moveTimestamp >= 5000
      );
      
      if (fruitsToReturn.length > 0) {
        // Remove returned items from fruits column
        setFruitColumn(prev => prev.filter(item => 
          !fruitsToReturn.some(fruit => fruit.id === item.id)
        ));
        
        // Add items back to main list
        setMainList(prev => [
          ...prev,
          ...fruitsToReturn.map(item => ({ ...item, moveTimestamp: undefined }))
        ]);
      }
      
      // Check vegetables column
      const vegetablesToReturn = vegetableColumn.filter(
        item => item.moveTimestamp && now - item.moveTimestamp >= 5000
      );
      
      if (vegetablesToReturn.length > 0) {
        // Remove returned items from vegetables column
        setVegetableColumn(prev => prev.filter(item => 
          !vegetablesToReturn.some(veg => veg.id === item.id)
        ));
        
        // Add items back to main list
        setMainList(prev => [
          ...prev,
          ...vegetablesToReturn.map(item => ({ ...item, moveTimestamp: undefined }))
        ]);
      }
    };

    // Check every 250ms
    const intervalId = setInterval(checkItemsToReturn, 250);
    return () => clearInterval(intervalId);
  }, [fruitColumn, vegetableColumn]);

  const handleItemClick = (item: FoodItem) => {
    // Remove item from main list
    setMainList(prev => prev.filter(i => i.id !== item.id));
    
    // Add item to the appropriate column with timestamp
    if (item.type === 'Fruit') {
      setFruitColumn(prev => [...prev, { ...item, moveTimestamp: Date.now() }]);
    } else {
      setVegetableColumn(prev => [...prev, { ...item, moveTimestamp: Date.now() }]);
    }
  };

  const handleColumnItemClick = (item: FoodItem, columnType: 'Fruit' | 'Vegetable') => {
    // Remove from column
    if (columnType === 'Fruit') {
      setFruitColumn(prev => prev.filter(i => i.id !== item.id));
    } else {
      setVegetableColumn(prev => prev.filter(i => i.id !== item.id));
    }
    
    // Add back to main list (at the bottom)
    setMainList(prev => [...prev, { ...item, moveTimestamp: undefined }]);
  };

  // Helper function to calculate remaining time
  const getRemainingTime = (moveTimestamp: number) => {
    const timeElapsed = (Date.now() - moveTimestamp) / 1000;
    const timeRemaining = Math.max(0, 5 - timeElapsed);
    return timeRemaining;
  };

  // Format the time remaining with one decimal place
  const formatTimeRemaining = (timeRemaining: number) => {
    return timeRemaining.toFixed(1);
  };

  return (
    <Box sx={{ flexGrow: 1, background: colors.background.gradient, minHeight: '100vh' }}>
      <AppHeader />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 2, sm: 3, md: 4 }, pb: { xs: 6, sm: 7, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push('/')}
          sx={{ 
            mb: { xs: 2, sm: 3 }, 
            color: 'text.primary',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.08)
            }
          }}
        >
          Back to Home
        </Button>
        
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
            background: 'linear-gradient(45deg, rgb(90,125,207), rgb(25,55,107))',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: { xs: 1.5, sm: 2 }
          }}
        >
          Food Sorting App
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Click on food items to sort them into Fruits and Vegetables. Items will return to the main list after 5 seconds,
          or you can click on them in their category column to return them immediately.
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Main List */}
          <Grid item xs={12} sm={4} md={3}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                height: { xs: '400px', sm: '450px', md: '500px' },
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: 'linear-gradient(90deg, rgb(255, 45, 85) 0%, rgb(52, 199, 89) 100%)',
                  borderRadius: '8px 8px 0 0'
                }}
              />
              
              <Typography 
                variant="h6" 
                gutterBottom 
                align="center"
                sx={{ 
                  mt: 1,
                  fontSize: { xs: '1.125rem', sm: '1.25rem' },
                  fontWeight: 600,
                  position: 'relative'
                }}
              >
                Available Food
              </Typography>
              
              <Stack spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 2, flexGrow: 1, pb: 1 }}>
                {mainList.map((item) => (
                  <Grow key={item.id} in={true} timeout={500}>
                    <Button
                      variant="contained"
                      color={item.type === 'Fruit' ? 'error' : 'success'}
                      fullWidth
                      onClick={() => handleItemClick(item)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        py: 1.5,
                        px: 2.5,
                        borderRadius: 2,
                        boxShadow: 2,
                        background: item.type === 'Fruit' ? colors.fruit.gradient : colors.vegetable.gradient,
                        '&:hover': {
                          background: item.type === 'Fruit' ? colors.fruit.gradient : colors.vegetable.gradient,
                          filter: 'brightness(1.05)',
                          transform: 'translateY(-2px)',
                          boxShadow: 3,
                          transition: 'all 0.3s ease'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          ml: 'auto', 
                          bgcolor: 'rgba(255,255,255,0.2)', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1,
                          fontWeight: 'medium'
                        }}
                      >
                        {item.type}
                      </Typography>
                    </Button>
                  </Grow>
                ))}
              </Stack>
            </Paper>
          </Grid>
          
          {/* Fruits Column */}
          <Grid item xs={12} sm={4} md={3}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                height: { xs: '400px', sm: '450px', md: '500px' },
                background: alpha(colors.fruit.main, 0.03),
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 8px 24px 0 rgba(255,45,85,0.08)',
                position: 'relative',
                border: `1px solid ${alpha(colors.fruit.main, 0.12)}`,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: colors.fruit.gradient,
                  borderRadius: '8px 8px 0 0'
                }}
              />
              
              <Typography 
                variant="h6" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: colors.fruit.main,
                  mt: 1,
                  fontWeight: 600
                }}
              >
                Fruits
              </Typography>
              
              <Stack spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 2, flexGrow: 1, pb: 1 }}>
                {fruitColumn.map((item) => {
                  const timeRemaining = getRemainingTime(item.moveTimestamp);
                  return (
                    <Fade key={item.id} in={true} timeout={400}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleColumnItemClick(item, 'Fruit')}
                        sx={{
                          justifyContent: 'space-between',
                          textTransform: 'none',
                          py: 1.5,
                          px: 2.5,
                          borderRadius: 2,
                          borderColor: alpha(colors.fruit.main, 0.5),
                          color: colors.fruit.dark,
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: `0 2px 8px 0 ${alpha(colors.fruit.main, 0.1)}`,
                          '&:hover': {
                            backgroundColor: alpha(colors.fruit.main, 0.08),
                            borderColor: colors.fruit.main,
                            boxShadow: `0 4px 12px 0 ${alpha(colors.fruit.main, 0.15)}`,
                            transform: 'translateY(-1px)',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: { xs: '3px', sm: '3.5px', md: '4px' },
                            width: `${(timeRemaining / 5) * 100}%`,
                            background: colors.fruit.gradient,
                            transition: 'width 0.2s linear'
                          }
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: alpha(colors.fruit.main, 0.1),
                            color: colors.fruit.dark,
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            fontWeight: 'medium',
                            minWidth: '30px',
                            textAlign: 'center'
                          }}
                        >
                          {formatTimeRemaining(timeRemaining)}s
                        </Typography>
                      </Button>
                    </Fade>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
          
          {/* Vegetables Column */}
          <Grid item xs={12} sm={4} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                height: { xs: '400px', sm: '450px', md: '500px' },
                background: alpha(colors.vegetable.main, 0.03),
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 8px 24px 0 rgba(52,199,89,0.08)',
                position: 'relative',
                border: `1px solid ${alpha(colors.vegetable.main, 0.12)}`,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: colors.vegetable.gradient,
                  borderRadius: '8px 8px 0 0'
                }}
              />
              
              <Typography 
                variant="h6" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: colors.vegetable.main,
                  mt: 1,
                  fontWeight: 600
                }}
              >
                Vegetables
              </Typography>
              
              <Stack spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 2, flexGrow: 1, pb: 1 }}>
                {vegetableColumn.map((item) => {
                  const timeRemaining = getRemainingTime(item.moveTimestamp);
                  return (
                    <Fade key={item.id} in={true} timeout={400}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleColumnItemClick(item, 'Vegetable')}
                        sx={{
                          justifyContent: 'space-between',
                          textTransform: 'none',
                          py: 1.5,
                          px: 2.5,
                          borderRadius: 2,
                          borderColor: alpha(colors.vegetable.main, 0.5),
                          color: colors.vegetable.dark,
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: `0 2px 8px 0 ${alpha(colors.vegetable.main, 0.1)}`,
                          '&:hover': {
                            backgroundColor: alpha(colors.vegetable.main, 0.08),
                            borderColor: colors.vegetable.main,
                            boxShadow: `0 4px 12px 0 ${alpha(colors.vegetable.main, 0.15)}`,
                            transform: 'translateY(-1px)',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: { xs: '3px', sm: '3.5px', md: '4px' },
                            width: `${(timeRemaining / 5) * 100}%`,
                            background: colors.vegetable.gradient,
                            transition: 'width 0.2s linear'
                          }
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: alpha(colors.vegetable.main, 0.1),
                            color: colors.vegetable.dark,
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            fontWeight: 'medium',
                            minWidth: '30px',
                            textAlign: 'center'
                          }}
                        >
                          {formatTimeRemaining(timeRemaining)}s
                        </Typography>
                      </Button>
                    </Fade>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
