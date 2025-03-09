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
  CircularProgress,
  TextField,
  InputAdornment,
  Paper, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon, Refresh as RefreshIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import AppHeader from '@/components/AppHeader';
import { useRouter } from 'next/navigation';
import { User, UserResponse } from '@/services/users.interface';

// Interface for the transformed data structure
interface DepartmentData {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: {
      [color: string]: number;
    };
    addressUser: {
      [name: string]: string;
    };
    // users: User[]; // Store original users for reference
  };
}

export default function ApiDataPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [transformedData, setTransformedData] = useState<DepartmentData>({});
  console.log('transformedData', transformedData)
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

  // Transform the user data into the department-based structure
  const transformUserData = (userData: User[]) => {
    return userData.reduce((departmentData: DepartmentData, user) => {
      const department = user.company.department;
      
      if (!departmentData[department]) {
        departmentData[department] = {
          male: 0,
          female: 0,
          ageRange: `${user.age}-${user.age}`,
          hair: {},
          addressUser: {},
          // users: []
        };
      }
      
      // Update gender count
      if (user.gender.toLowerCase() === 'male') {
        departmentData[department].male += 1;
      } else if (user.gender.toLowerCase() === 'female') {
        departmentData[department].female += 1;
      }
      
      // Update age range
      const [minAge, maxAge] = departmentData[department].ageRange.split('-').map(Number);
      const newMinAge = Math.min(minAge, user.age);
      const newMaxAge = Math.max(maxAge, user.age);
      departmentData[department].ageRange = `${newMinAge}-${newMaxAge}`;
      
      // Update hair color count
      const hairColor = user.hair.color;
      departmentData[department].hair[hairColor] = 
        (departmentData[department].hair[hairColor] || 0) + 1;
      
      // Add user address info
      const userName = `${user.firstName}${user.lastName}`;
      departmentData[department].addressUser[userName] = user.address.postalCode;
      
      // Store original user
      // departmentData[department].users.push(user);
      
      return departmentData;
    }, {} as DepartmentData);
  };
  
  // Update transformed data when users change
  useEffect(() => {
    if (users.length > 0) {
      const transformedData = transformUserData(users);
      setTransformedData(transformedData);
    }
  }, [users]);
  
  // Filter departments based on search term
  const filteredDepartments = Object.entries(transformedData)
    .filter(([department]) => {
      if (searchTerm === '') return true;
      
      // Check if department name matches
      if (department.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      
      // Check if any user in this department matches
      // return data.users.some(user => {
      //   const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      //   return fullName.includes(searchTerm.toLowerCase()) || 
      //          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //          user.username.toLowerCase().includes(searchTerm.toLowerCase());
      // });
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
          <>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Department Summary View
              </Typography>

              <Grid container spacing={3}>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map(([department, data]) => (
                    <Grid key={department} item xs={12}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-${department}-content`}
                          id={`panel-${department}-header`}
                        >
                          <Typography variant="h6">{department}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Card sx={{ mb: 2 }}>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>Department Stats</Typography>
                                  <TableContainer>
                                    <Table size="small">
                                      <TableBody>
                                        <TableRow>
                                          <TableCell component="th" scope="row">Male Count</TableCell>
                                          <TableCell align="right">{data.male}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">Female Count</TableCell>
                                          <TableCell align="right">{data.female}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">Age Range</TableCell>
                                          <TableCell align="right">{data.ageRange}</TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>Hair Color Distribution</Typography>
                                  <TableContainer>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Color</TableCell>
                                          <TableCell align="right">Count</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {Object.entries(data.hair).map(([color, count]) => (
                                          <TableRow key={color}>
                                            <TableCell component="th" scope="row">{color}</TableCell>
                                            <TableCell align="right">{count}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </CardContent>
                              </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>Users & Postal Codes</Typography>
                                  <TableContainer>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Name</TableCell>
                                          <TableCell align="right">Postal Code</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {Object.entries(data.addressUser).map(([name, postalCode]) => (
                                          <TableRow key={name}>
                                            <TableCell component="th" scope="row">{name}</TableCell>
                                            <TableCell align="right">{postalCode}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </CardContent>
                              </Card>
                            </Grid>

                            {/* <Grid item xs={12}>
                              <Typography variant="subtitle1" gutterBottom>Users in Department</Typography>
                              <List dense>
                                {data.users.map(user => (
                                  <ListItem key={user.id}>
                                    <ListItemText
                                      primary={`${user.firstName} ${user.lastName}`}
                                      secondary={`Age: ${user.age} | Gender: ${user.gender} | Hair: ${user.hair.color}`}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Grid> */}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                      <Typography variant="h6">No departments match your search criteria</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                JSON Data Structure
              </Typography>
              <pre style={{ overflowX: 'auto', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                {JSON.stringify(transformedData, null, 2)}
              </pre>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
}
