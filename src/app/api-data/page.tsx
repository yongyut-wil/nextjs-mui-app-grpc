'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  InputAdornment, Paper,
  Divider,
  Chip
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import AppHeader from '@/components/AppHeader';
import { useRouter } from 'next/navigation';
import { User, UserResponse } from '@/services/users.interface';

export default function ApiDataPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch data from the gRPC API
  const fetchData = async (skipParam: number = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/grpc?limit=${limit}&skip=${skipParam}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: UserResponse = await response.json();
      
      setUsers(data.users);
      setTotal(data.total);
      setSkip(data.skip);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle pagination
  const handleNextPage = () => {
    const nextSkip = skip + limit;
    if (nextSkip < total) {
      fetchData(nextSkip);
    }
  };

  const handlePrevPage = () => {
    const prevSkip = skip - limit;
    if (prevSkip >= 0) {
      fetchData(prevSkip);
    }
  };
  
  // Calculate current page for display
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppHeader />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push('/')}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          API Data Explorer
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          Fetch and display user data from the dummyjson.com API using gRPC. Search for specific users by name, email, or username and browse through pages.
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              placeholder="Search by name or email"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, maxWidth: { xs: '100%', sm: '300px' } }}
            />
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                startIcon={<RefreshIcon />} 
                onClick={() => fetchData(skip)}
              >
                Refresh
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  disabled={skip === 0} 
                  onClick={handlePrevPage}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Typography sx={{ mx: 2 }}>
                  Page {currentPage} of {totalPages}
                </Typography>
                <Button 
                  disabled={skip + limit >= total} 
                  onClick={handleNextPage}
                  variant="outlined"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', bgcolor: 'error.light', color: 'error.contrastText' }}>
            <Typography variant="h6">{error}</Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }} 
              onClick={() => fetchData()}
            >
              Try Again
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <Grid key={user.id} item xs={12} sm={6} md={4}>
                  <Card sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        @{user.username}
                      </Typography>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <strong>Phone:</strong> {user.phone}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <strong>Age:</strong> {user.age}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <strong>Gender:</strong> {user.gender}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                        <Chip 
                          size="small" 
                          label={user.bloodGroup} 
                          color="error" 
                          variant="outlined" 
                        />
                        <Chip 
                          size="small" 
                          label={`${user.height} cm`} 
                          color="primary" 
                          variant="outlined" 
                        />
                        <Chip 
                          size="small" 
                          label={user.university} 
                          color="info" 
                          variant="outlined" 
                          sx={{ 
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                <Typography variant="h6">No users match your search criteria</Typography>
              </Box>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
