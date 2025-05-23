import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl 
} from '@mui/material';

const CostEntryForm = ({ onCostSubmit, onCancel }) => {
  const [costData, setCostData] = useState({
    category: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCostData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCostSubmit(costData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={costData.category}
          onChange={handleChange}
          label="Category"
          required
        >
          <MenuItem value="Office Supplies">Office Supplies</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Equipment">Equipment</MenuItem>
          <MenuItem value="Software">Software</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        name="amount"
        type="number"
        value={costData.amount}
        onChange={handleChange}
        inputProps={{ min: "0", step: "0.01" }}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Date"
        name="date"
        type="date"
        value={costData.date}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={costData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onCancel} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CostEntryForm;