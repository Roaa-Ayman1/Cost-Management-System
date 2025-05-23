import React, { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  ThemeProvider,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Toolbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { theme } from './assets/styles/theme';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import CostEntry from './components/CostEntry/CostEntry';
import InvoiceGenerator from './components/InvoiceGenerator/InvoiceGenerator';
import InvoiceEditor from './components/InvoiceEditor/InvoiceEditor';
import InvoiceReminder from './components/InvoiceReminder/InvoiceReminder';
import TaxCalculator from './components/TaxCalculator/TaxCalculator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Static initial cost entries
const INITIAL_COSTS = [
  {
    id: '1',
    category: 'Office Supplies',
    amount: 45.99,
    date: new Date().toISOString().split('T')[0],
    description: 'Printer paper (10 reams)'
  },
  {
    id: '2',
    category: 'Software',
    amount: 199.00,
    date: new Date().toISOString().split('T')[0],
    description: 'Project management tool subscription'
  },
  {
    id: '3',
    category: 'Equipment',
    amount: 1200.00,
    date: new Date().toISOString().split('T')[0],
    description: 'New office chair'
  }
];

const navItems = [
  { name: 'Cost Entry', view: 'costEntry', icon: '💰' },
  { name: 'Invoice Generator', view: 'invoiceGenerator', icon: '🧾' },
  { name: 'View Invoices', view: 'invoices', icon: '📋' },
  { name: 'Tax Calculator', view: 'taxCalculator', icon: '🧮' },
];

const CostManagementSystem = () => {
  const [costs, setCosts] = useState(INITIAL_COSTS);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [currentView, setCurrentView] = useState('costEntry');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCostSubmit = (costRecord) => {
    const newCost = {
      ...costRecord,
      id: Date.now().toString()
    };
    setCosts(prev => [...prev, newCost]);
  };

  const handleInvoiceCreate = (invoice) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    const invoiceWithDueDate = {
      ...invoice,
      id: Date.now().toString(),
      dueDate: dueDate.toISOString()
    };
    setInvoices(prev => [...prev, invoiceWithDueDate]);
  };

  const handleInvoiceUpdate = (updatedInvoice) => {
    setInvoices(prev => 
      prev.map(inv => 
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      )
    );
    setSelectedInvoice(null);
    setCurrentView('invoices');
  };

  const handleSendReminder = (notification) => {
    console.log('Reminder sent:', notification);
    alert(`Reminder sent via ${notification.method}`);
  };

  const renderView = () => {
    switch (currentView) {
      case 'costEntry':
        return (
          <Box sx={{ width: '90%', textAlign: 'left' }}>
            <CostEntry onCostSubmit={handleCostSubmit} costs={costs} />
          </Box>
        );
      case 'invoiceGenerator':
        return (
          <Box sx={{ width: '90%', textAlign: 'left' }}>
            <InvoiceGenerator onInvoiceCreate={handleInvoiceCreate} costEntries={costs} />
          </Box>
        );
      case 'invoices':
        return (
          <Box sx={{ width: '100%', textAlign: 'left' }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'left' }}>Invoices</Typography>
            <Paper elevation={3} sx={{ p: 2, width: 'fit-content' }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="invoices table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: 'left' }}>Invoice #</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>Client</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>Date</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>Total</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>Status</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell sx={{ textAlign: 'left' }}>{invoice.invoiceNumber}</TableCell>
                        <TableCell sx={{ textAlign: 'left' }}>{invoice.clientName}</TableCell>
                        <TableCell sx={{ textAlign: 'left' }}>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ textAlign: 'left' }}>${invoice.total.toFixed(2)}</TableCell>
                        <TableCell sx={{ textAlign: 'left' }}>
                          <Chip 
                            label={invoice.status} 
                            color={
                              invoice.status === 'paid' ? 'success' : 
                              invoice.status === 'pending' ? 'warning' : 'error'
                            } 
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'left' }}>
                          <IconButton onClick={() => {
                            setSelectedInvoice(invoice);
                            setCurrentView('editInvoice');
                          }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => {
                            setSelectedInvoice(invoice);
                            setCurrentView('sendReminder');
                          }}>
                            <NotificationsIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        );
      case 'editInvoice':
        return (
          <Box sx={{ width: '100%', textAlign: 'left' }}>
            <InvoiceEditor 
              invoice={selectedInvoice} 
              onSave={handleInvoiceUpdate} 
              onCancel={() => setCurrentView('invoices')} 
            />
          </Box>
        );
      case 'sendReminder':
        return (
          <Box sx={{ width: '100%', textAlign: 'left' }}>
            <InvoiceReminder 
              invoice={selectedInvoice} 
              onSendReminder={handleSendReminder}
              onCancel={() => setCurrentView('invoices')}
            />
          </Box>
        );
      case 'taxCalculator':
        return (
          <Box sx={{ width: '90%', textAlign: 'left' }}>
            <TaxCalculator />
          </Box>
        );
      default:
        return (
          <Box sx={{ width: '100%', textAlign: 'left' }}>
            <CostEntry onCostSubmit={handleCostSubmit} costs={costs} />
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        <Sidebar 
          mobileOpen={mobileOpen} 
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '64px',
            marginLeft: { sm: '240px' },
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f5f5f5'
          }}
        >
          {renderView()}
        </Box>
      </Box>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ThemeProvider>
  );
};

export default CostManagementSystem;