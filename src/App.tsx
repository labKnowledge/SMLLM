import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button, 
  useMediaQuery, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton 
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import ContentCreator from "./components/ContentCreator";
import LetChatSmall from './components/LetChatSmall';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'content' | 'chat'>('content');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleViewChange = (view: 'content' | 'chat') => {
    setCurrentView(view);
    setDrawerOpen(false);
  };

  const navItems = [
    { label: 'Content Creator', view: 'content' },
    { label: 'Chat', view: 'chat' },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <Button 
          key={item.view}
          color="inherit"
          onClick={() => handleViewChange(item.view as 'content' | 'chat')}
          sx={{ mx: 1 }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Assistant
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                >
                  <List>
                    <ListItem>
                      <IconButton onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItem>
                    {navItems.map((item) => (
                      <ListItem key={item.view} disablePadding>
                        <ListItemText>
                          <Button 
                            fullWidth
                            onClick={() => handleViewChange(item.view as 'content' | 'chat')}
                          >
                            {item.label}
                          </Button>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            renderNavItems()
          )}
        </Toolbar>
      </AppBar>
      <StyledContainer maxWidth="md">
        {currentView === 'content' ? <ContentCreator /> : <LetChatSmall />}
      </StyledContainer>
    </Box>
  );
};

export default App;