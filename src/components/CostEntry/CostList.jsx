import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CostList = ({ costs }) => {
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '25%' }}>Date</TableCell>
            <TableCell sx={{ width: '25%' }}>Category</TableCell>
            <TableCell sx={{ width: '35%' }}>Description</TableCell>
            <TableCell sx={{ width: '15%' }} align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {costs.map((cost) => (
            <TableRow key={cost.id}>
              <TableCell sx={{ width: '25%' }}>{cost.date}</TableCell>
              <TableCell sx={{ width: '25%' }}>{cost.category}</TableCell>
              <TableCell sx={{ width: '35%' }}>{cost.description}</TableCell>
              <TableCell sx={{ width: '15%' }} align="right">${cost.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CostList;