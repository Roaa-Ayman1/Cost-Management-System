import { useState } from 'react';
import { Box, TextField, MenuItem, Typography, Paper, Button } from '@mui/material';

const taxRates = {
  'US-NY': 8.875,
  'US-CA': 7.25,
  'US-TX': 6.25,
  'EU-GER': 19,
  'EU-FRA': 20,
  'UK': 20,
  'CA-ON': 13,
  'AU': 10,
  'OTHER': 0
};

const TaxCalculator = ({ subtotal = 0, onTaxCalculated }) => {
  const [region, setRegion] = useState('US-NY');
  const [customRate, setCustomRate] = useState(0);

  const calculateTax = () => {
    const rate = region === 'CUSTOM' ? customRate : taxRates[region];
    const taxAmount = subtotal * (rate / 100);
    const total = subtotal + taxAmount;

    const result = {
      region,
      taxRate: rate,
      taxAmount,
      total
    };

    if (onTaxCalculated) onTaxCalculated(result);
    return result;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Tax Calculation</Typography>
      <TextField
        select
        fullWidth
        label="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        margin="normal"
      >
        {Object.keys(taxRates).map((key) => (
          <MenuItem key={key} value={key}>
            {key} ({taxRates[key]}%)
          </MenuItem>
        ))}
        <MenuItem value="CUSTOM">Custom Rate</MenuItem>
      </TextField>

      {region === 'CUSTOM' && (
        <TextField
          fullWidth
          label="Custom Tax Rate (%)"
          type="number"
          value={customRate}
          onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
          margin="normal"
          inputProps={{ min: 0, max: 100, step: 0.01 }}
        />
      )}

      <Button 
        variant="contained" 
        onClick={calculateTax}
        sx={{ mt: 2 }}
      >
        Calculate Tax
      </Button>
    </Paper>
  );
};

export default TaxCalculator;