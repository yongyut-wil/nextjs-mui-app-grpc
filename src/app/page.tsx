'use client';

import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Info as InfoIcon, Settings as SettingsIcon } from '@mui/icons-material';
import AppHeader from '@/components/AppHeader';
import FeatureCard from '@/components/FeatureCard';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Header */}
      <AppHeader />

      {/* Hero Section */}
      {/* <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          py: 8
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.4)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
            Welcome to Your Next.js App
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            A modern web application built with Next.js and Material UI.
            This starter template includes everything you need to build amazing websites.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
            <Button variant="outlined" color="inherit">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Paper> */}

      {/* Feature Cards */}
      <Container maxWidth="lg" sx={{ mb: 8, mt: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          7 Solution Frontend Developer Test
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featuresData.map((feature) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={feature.title} onClick={() => handleNavigation(feature.path)}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Next.js MUI Application
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
            Built with Next.js, TypeScript, and Material UI
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' All rights reserved.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

// Feature cards data
const featuresData = [
  {
    title: '1. Auto Delete Todo List',
    description: 'Implement a todo list with automatic deletion functionality.',
    icon: <SettingsIcon fontSize="large" color="primary" />,
    path: '/todo-list',
  },
  {
    title: '2. Create data from API',
    description: 'Fetch and display data from an external API.',
    icon: <InfoIcon fontSize="large" color="primary" />,
    path: '/api-data',
  },
  // {
  //   title: 'Best Practices',
  //   description: 'Follows industry best practices for performance, accessibility, and SEO optimization.',
  //   icon: <InfoIcon fontSize="large" color="primary" />,
  // },
];
