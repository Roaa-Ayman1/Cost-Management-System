import { Box, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import {
  AttachMoney as RevenueIcon,
  Receipt as InvoiceIcon,
  TrendingUp as GrowthIcon,
  Payment as CostIcon,
} from '@mui/icons-material';
import RecentInvoices from '../components/RecentInvoices';
import CostChart from '../components/CostChart';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$12,345', icon: <RevenueIcon fontSize="large" /> },
    { title: 'Pending Invoices', value: '8', icon: <InvoiceIcon fontSize="large" /> },
    { title: 'Monthly Growth', value: '+12%', icon: <GrowthIcon fontSize="large" /> },
    { title: 'Total Costs', value: '$5,678', icon: <CostIcon fontSize="large" /> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ color: 'primary.main' }}>{stat.icon}</Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Monthly Costs
              </Typography>
              <CostChart />
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Invoices
              </Typography>
              <RecentInvoices />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;