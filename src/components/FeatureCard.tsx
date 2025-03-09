'use client';

import { ReactNode } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  actionText?: string;
  onActionClick?: () => void;
}

const hoverAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const FeatureCard = ({
  title,
  description,
  icon,
}: FeatureCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          animation: `${hoverAnimation} 0.5s ease-in-out`
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {icon}
        </Box>
        <Typography gutterBottom variant="h5" component="h3" align="center">
          {title}
        </Typography>
        <Typography align="center">
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" color="primary" onClick={onActionClick}>
          {actionText}
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default FeatureCard;
