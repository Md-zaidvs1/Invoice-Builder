import React from 'react';

const Totals = ({ items }) => {
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="mt-6 flex justify-end">
      <div className="w-72">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center text-sm text-gray-600 py-1.5 border-b border-gray-100">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 py-1.5 border-b border-gray-100">
            <span className="font-medium">GST (18%)</span>
            <span className="font-semibold text-gray-800">₹{taxAmount.toFixed(2)}</span>
          </div>
        </div>
        <div
          className="flex justify-between items-center px-4 py-3 rounded-xl text-white"
          style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
        >
          <span className="font-bold text-sm uppercase tracking-wider">Grand Total</span>
          <span className="font-black text-xl">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Totals;