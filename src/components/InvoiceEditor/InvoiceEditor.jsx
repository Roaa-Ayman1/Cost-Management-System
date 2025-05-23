import React, { useState, useEffect } from 'react';

const InvoiceEditor = ({ invoice, onSave, onCancel }) => {
  const [editedInvoice, setEditedInvoice] = useState({ ...invoice });

  useEffect(() => {
    setEditedInvoice({ ...invoice });
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoice(prev => ({
      ...prev,
      [name]: name.includes('Rate') || name.includes('discount') 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...editedInvoice.items];
    newItems[index] = {
      ...newItems[index],
      [name]: name === 'quantity' || name === 'unitPrice' 
        ? parseFloat(value) || 0 
        : value
    };
    setEditedInvoice(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setEditedInvoice(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = editedInvoice.items.filter((_, i) => i !== index);
    setEditedInvoice(prev => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subtotal = editedInvoice.items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice), 0
    );
    const taxAmount = subtotal * (editedInvoice.taxRate / 100);
    const discountAmount = subtotal * (editedInvoice.discount / 100);
    const total = subtotal + taxAmount - discountAmount;

    const updatedInvoice = {
      ...editedInvoice,
      subtotal,
      taxAmount,
      discountAmount,
      total,
      lastUpdated: new Date().toISOString()
    };

    onSave(updatedInvoice);
  };

  if (!invoice) return <div>No invoice selected for editing</div>;

  return (
    <div className="invoice-editor">
      <h2>Edit Invoice: {invoice.invoiceNumber}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client ID:</label>
          <input
            type="text"
            name="clientId"
            value={editedInvoice.clientId}
            onChange={handleChange}
            required
          />
        </div>
        
        <h3>Items:</h3>
        {editedInvoice.items.map((item, index) => (
          <div key={index} className="invoice-item">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                min="1"
                required
              />
            </div>
            <div>
              <label>Unit Price:</label>
              <input
                type="number"
                name="unitPrice"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, e)}
                min="0"
                step="0.01"
                required
              />
            </div>
            <button type="button" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
        
        <div>
          <label>Tax Rate (%):</label>
          <input
            type="number"
            name="taxRate"
            value={editedInvoice.taxRate}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div>
          <label>Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={editedInvoice.discount}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        
        <div>
          <label>Status:</label>
          <select 
            name="status" 
            value={editedInvoice.status} 
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default InvoiceEditor;