"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Contacts as ContactsIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";

// Define consistent color palette
const darkColors = {
  primary: "rgb(76,95,138)", // Medium blue
  secondary: "rgb(0,21,36)", // Dark blue
  gradient: "linear-gradient(45deg, rgb(0,21,36) 30%, rgb(0,19,33) 90%)", // Gradient between the dark blues
  text: "#ffffff",
  background: "rgb(0,19,33)", // Dark blue background
  backgroundVariant: "rgb(0,21,36)", // Slightly different dark blue
  hover: "rgba(76,95,138, 0.15)" // Dark blue hover effect
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lightColors = {
  primary: "rgb(100,125,170)", // Lighter blue - easier to see in light mode
  secondary: "rgb(76,95,138)", // Medium blue
  gradient: "linear-gradient(45deg, rgb(76,95,138) 30%, rgb(100,125,170) 90%)", // Gradient from medium blue to lighter blue
  text: "#333333",
  background: "#ffffff",
  backgroundVariant: "#f5f8ff",
  hover: "rgba(76,95,138, 0.08)" // Light blue hover effect
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "transparent", // We'll use sx prop for conditional background
  boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  backdropFilter: "blur(10px)",
  position: "sticky",
  top: 0,
  zIndex: 1100,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  fontWeight: "bold",
  letterSpacing: "0.5px",
  borderRadius: "8px",
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1.05)",
    transition: "all 0.3s ease-in-out",
  },
}));

const navItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Todo List", icon: <ContactsIcon />, path: "/todo-list" },
  { text: "API Data", icon: <InfoIcon />, path: "/api-data" },
];

interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title = "Next.js MUI Application" }: AppHeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleNavigation = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: "100%",
        background: darkColors.background,
        height: "100%",
        transition: "background 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          p: 2, 
          background: darkColors.gradient,
          color: "#fff",
          borderBottom: `1px solid rgba(255,255,255,0.1)` 
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "#fff" }}>
          <MenuIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 2 }}>
        {navItems.map((item, index) => (
          <Grow
            in={true}
            key={item.text}
            style={{ transformOrigin: "0 0 0" }}
            {...{ timeout: 500 + index * 150 }}
          >
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{ 
                  borderRadius: "8px",
                  mx: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: darkColors.hover,
                  }
                }}
              >
                <ListItemIcon sx={{ color: darkColors.primary, minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: darkColors.text }}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItemButton>
            </ListItem>
          </Grow>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar
        position="static"
        color="primary"
        sx={{ 
          background: darkColors.gradient,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            {title}
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex" }}>
              {navItems.map((item, index) => (
                <Fade
                  in={true}
                  key={item.text}
                  {...{ timeout: 1000 + index * 500 }}
                >
                  <StyledButton
                    color="inherit"
                    startIcon={item.icon}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.text}
                  </StyledButton>
                </Fade>
              ))}
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: darkColors.background,
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(0,0,0,0.4)",
            borderRadius: { xs: 0, sm: "0 16px 16px 0" },
            overflowX: "hidden",
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AppHeader;
