import { Box, TextField, Button } from '@mui/material';

const ClientDetails = ({ data, setData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <TextField
        fullWidth
        margin="normal"
        label="Client ID"
        name="clientId"
        value={data.clientId}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Client Name"
        name="clientName"
        value={data.clientName}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Client Email"
        name="clientEmail"
        type="email"
        value={data.clientEmail}
        onChange={handleChange}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ClientDetails;