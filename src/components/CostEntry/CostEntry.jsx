import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CostEntryForm from './CostEntryForm';
import CostList from './CostList';

const CostEntry = ({ onCostSubmit, costs }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Cost Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          sx={{ textTransform: 'none' }}
        >
          Add New Cost
        </Button>
      </Box>

      {openForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <CostEntryForm
              onCostSubmit={(cost) => {
                onCostSubmit(cost);
                setOpenForm(false);
              }}
              onCancel={() => setOpenForm(false)}
            />
          </Paper>
        </motion.div>
      )}

      <Paper elevation={3} sx={{ p: 3 }}>
        <CostList costs={costs} />
      </Paper>
    </Box>
  );
};

export default CostEntry;