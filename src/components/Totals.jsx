import React from 'react';

const Totals = ({ items }) => {
  // Calculate Subtotal dynamically
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  
  // Apply 18% Tax as per standard invoice requirements
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="mt-6 flex justify-end">
      <div className="w-64 border-t-2 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (18%):</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold border-t pt-2">
          <span>Grand Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Totals;