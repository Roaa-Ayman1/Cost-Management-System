import { useState } from 'react';
import { Box, Button, TextField, IconButton, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const InvoiceItems = ({ data, setData, onBack, onNext }) => {
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...data.items];
    newItems[index] = {
      ...newItems[index],
      [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value
    };
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, items: newItems }));
  };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      {data.items.map((item, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1">Item {index + 1}</Typography>
            {data.items.length > 1 && (
              <IconButton onClick={() => removeItem(index)} size="small">
                <RemoveIcon />
              </IconButton>
            )}
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Item Name"
            name="name"
            value={item.name}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            name="quantity"
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Unit Price"
            name="unitPrice"
            type="number"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
        </Box>
      ))}
      <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mb: 2 }}>
        Add Item
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceItems;