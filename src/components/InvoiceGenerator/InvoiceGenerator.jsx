import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stepper, 
  Step, 
  StepLabel,
  TextField
} from '@mui/material';
import { Description as InvoiceIcon } from '@mui/icons-material';
import TaxCalculator from '../TaxCalculator/TaxCalculator';
import CostItemSelector from './CostItemSelector';

const steps = ['Select Costs', 'Client Details', 'Review Invoice'];

const InvoiceGenerator = ({ onInvoiceCreate, costEntries }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [invoiceData, setInvoiceData] = useState({
    clientId: '',
    clientName: '',
    clientEmail: '',
    selectedCosts: [],
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    notes: '',
  });

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const handleTaxCalculated = (taxData) => {
    setInvoiceData(prev => ({
      ...prev,
      taxRate: taxData.taxRate,
      taxAmount: taxData.taxAmount
    }));
  };

  const subtotal = invoiceData.selectedCosts.reduce(
    (sum, cost) => sum + cost.amount, 0
  );

  const generateInvoice = () => {
    const invoice = {
      invoiceNumber: `INV-${Date.now()}`,
      clientId: invoiceData.clientId,
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      date: new Date().toISOString(),
      items: invoiceData.selectedCosts.map(cost => ({
        name: cost.description,
        quantity: 1,
        unitPrice: cost.amount,
        category: cost.category
      })),
      subtotal,
      taxRate: invoiceData.taxRate,
      taxAmount: invoiceData.taxAmount,
      discount: invoiceData.discount,
      total: subtotal + invoiceData.taxAmount - invoiceData.discount,
      status: 'pending',
      notes: invoiceData.notes
    };

    onInvoiceCreate(invoice);
    setActiveStep(0);
    setInvoiceData({
      clientId: '',
      clientName: '',
      clientEmail: '',
      selectedCosts: [],
      taxRate: 0,
      taxAmount: 0,
      discount: 0,
      notes: '',
    });
  };

  return (
    <Box sx={{ 
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Align container to left
      width: '100%',
      maxWidth: '900px', // Control maximum width
      marginLeft: 0 // Force to left edge
    }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        width: '100%'
      }}>
        <InvoiceIcon sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Invoice Generator
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 3, width: '100%' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ 
        p: 3,
        width: '100%'
      }}>
        {activeStep === 0 && (
          <CostItemSelector
            costEntries={costEntries}
            selectedCosts={invoiceData.selectedCosts}
            onSelect={(selected) => setInvoiceData(prev => ({
              ...prev,
              selectedCosts: selected
            }))}
            onNext={handleNext}
          />
        )}

        {activeStep === 1 && (
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              margin="normal"
              label="Client ID"
              value={invoiceData.clientId}
              onChange={(e) => setInvoiceData(prev => ({
                ...prev,
                clientId: e.target.value
              }))}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Client Name"
              value={invoiceData.clientName}
              onChange={(e) => setInvoiceData(prev => ({
                ...prev,
                clientName: e.target.value
              }))}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Client Email"
              type="email"
              value={invoiceData.clientEmail}
              onChange={(e) => setInvoiceData(prev => ({
                ...prev,
                clientEmail: e.target.value
              }))}
              required
            />
            <TaxCalculator 
              subtotal={subtotal} 
              onTaxCalculated={handleTaxCalculated} 
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} variant="contained">
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>Client Information</Typography>
            <Typography>Client ID: {invoiceData.clientId}</Typography>
            <Typography>Name: {invoiceData.clientName}</Typography>
            <Typography>Email: {invoiceData.clientEmail}</Typography>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Invoice Items</Typography>
            {invoiceData.selectedCosts.map((cost, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography>{cost.description} - ${cost.amount.toFixed(2)}</Typography>
              </Box>
            ))}

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Summary</Typography>
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography>Tax ({invoiceData.taxRate}%): ${invoiceData.taxAmount.toFixed(2)}</Typography>
            <Typography>Total: ${(subtotal + invoiceData.taxAmount).toFixed(2)}</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={generateInvoice} variant="contained" color="primary">
                Generate Invoice
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default InvoiceGenerator;