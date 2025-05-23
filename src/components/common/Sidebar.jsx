import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Divider,
    Box,
    Toolbar,
    useTheme 
  } from '@mui/material';
  
  const Sidebar = ({ mobileOpen, handleDrawerToggle, navItems, currentView, setCurrentView }) => {
    const theme = useTheme();
    
    const SidebarContent = ({ navItems, currentView, setCurrentView }) => {
      return (
        <div>
          <Toolbar />
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.view}
                selected={currentView === item.view}
                onClick={() => setCurrentView(item.view)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </div>
      );
    };
  
    return (
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <SidebarContent navItems={navItems} currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
          open
        >
          <SidebarContent navItems={navItems} currentView={currentView} setCurrentView={setCurrentView} />
        </Drawer>
      </Box>
    );
  };
  
  export default Sidebar;