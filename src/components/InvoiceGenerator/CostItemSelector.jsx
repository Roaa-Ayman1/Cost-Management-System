import { useState } from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography
} from '@mui/material';

const CostItemSelector = ({ costEntries, selectedCosts, onSelect, onNext }) => {
  const [selected, setSelected] = useState(selectedCosts.map(c => c.id));

  const handleToggle = (cost) => () => {
    const currentIndex = selected.indexOf(cost.id);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(cost.id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleSubmit = () => {
    const selectedItems = costEntries.filter(cost => selected.includes(cost.id));
    onSelect(selectedItems);
    onNext();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Costs to Include in Invoice
      </Typography>
      {costEntries.length === 0 ? (
        <Typography>No cost entries available</Typography>
      ) : (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {costEntries.map((cost) => (
            <ListItem
              key={cost.id}
              secondaryAction={
                <Typography>${cost.amount.toFixed(2)}</Typography>
              }
              disablePadding
            >
              <ListItemButton onClick={handleToggle(cost)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selected.indexOf(cost.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={cost.description} 
                  secondary={`${cost.category} - ${new Date(cost.date).toLocaleDateString()}`} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={selected.length === 0}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CostItemSelector;