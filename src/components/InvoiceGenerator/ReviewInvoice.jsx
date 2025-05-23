import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ReviewInvoice = ({ data, onBack, onSubmit }) => {
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = subtotal * (data.taxRate / 100);
  const discountAmount = subtotal * (data.discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Client Information
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography>Client ID: {data.clientId}</Typography>
        <Typography>Name: {data.clientName}</Typography>
        <Typography>Email: {data.clientEmail}</Typography>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Invoice Items
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell align="right">${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Box sx={{ width: 300 }}>
          <Typography variant="h6">Summary</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal:</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tax ({data.taxRate}%):</Typography>
            <Typography>${taxAmount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Discount ({data.discount}%):</Typography>
            <Typography>-${discountAmount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, fontWeight: 'bold' }}>
            <Typography>Total:</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>Back</Button>
        <Button variant="contained" color="primary" onClick={() => onSubmit({
          ...data,
          subtotal,
          taxAmount,
          discountAmount,
          total,
          date: new Date().toISOString(),
          invoiceNumber: `INV-${Date.now()}`,
          status: 'pending'
        })}>
          Generate Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewInvoice;