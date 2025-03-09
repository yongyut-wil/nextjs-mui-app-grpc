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
];
