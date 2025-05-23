import React, { useState, useEffect } from 'react';

const InvoiceReminder = ({ invoice, onSendReminder }) => {
  const [reminderData, setReminderData] = useState({
    method: 'email',
    message: '',
    sendDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (invoice) {
      const defaultMessage = `Dear Client,\n\nThis is a reminder that invoice ${invoice.invoiceNumber} for ${invoice.total.toFixed(2)} is due on ${new Date(invoice.dueDate).toLocaleDateString()}.\n\nPlease make payment at your earliest convenience.\n\nThank you,\n[Your Company Name]`;
      
      setReminderData(prev => ({
        ...prev,
        message: defaultMessage
      }));
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const notification = {
      invoiceId: invoice.invoiceNumber,
      clientId: invoice.clientId,
      dueDate: invoice.dueDate,
      amountDue: invoice.total,
      method: reminderData.method,
      message: reminderData.message,
      sentDate: new Date().toISOString(),
      status: 'sent'
    };
    onSendReminder(notification);
  };

  if (!invoice) return <div>No invoice selected for reminder</div>;

  return (
    <div className="invoice-reminder">
      <h2>Send Reminder for Invoice: {invoice.invoiceNumber}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client: {invoice.clientId}</label>
        </div>
        <div>
          <label>Amount Due: {invoice.total.toFixed(2)}</label>
        </div>
        <div>
          <label>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</label>
        </div>
        
        <div>
          <label>Notification Method:</label>
          <select 
            name="method" 
            value={reminderData.method} 
            onChange={handleChange}
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="in-app">In-App Notification</option>
          </select>
        </div>
        
        <div>
          <label>Send Date:</label>
          <input 
            type="date" 
            name="sendDate" 
            value={reminderData.sendDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div>
          <label>Message:</label>
          <textarea 
            name="message" 
            value={reminderData.message} 
            onChange={handleChange} 
            rows="6"
            required 
          />
        </div>
        
        <button type="submit">Send Reminder</button>
      </form>
    </div>
  );
};

export default InvoiceReminder;