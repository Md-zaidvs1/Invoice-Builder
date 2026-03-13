import React, { useState } from 'react';

const InvoiceTable = ({ items, setItems, isPrinting }) => {
  const [newItem, setNewItem] = useState({ description: '', quantity: 1, rate: 0 });
  const [error, setError] = useState('');

  const handleAddItem = () => {
    if (!newItem.description.trim()) {
      setError('Description is required!');
      return;
    }
    if (newItem.quantity <= 0) {
      setError('Quantity must be greater than 0!');
      return;
    }
    if (newItem.rate < 0) {
      setError('Rate cannot be negative!');
      return;
    }
    const amount = newItem.quantity * newItem.rate;
    setItems([...items, { ...newItem, id: Date.now(), amount }]);
    setNewItem({ description: '', quantity: 1, rate: 0 });
    setError('');
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-2">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Line Items</h3>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
            <th className="text-left text-white font-semibold py-3 px-4 rounded-tl-lg"
                style={{ letterSpacing: '0.05em', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              Description
            </th>
            <th className="text-center text-white font-semibold py-3 px-4"
                style={{ letterSpacing: '0.05em', fontSize: '0.7rem', textTransform: 'uppercase', width: '80px' }}>
              Qty
            </th>
            <th className="text-center text-white font-semibold py-3 px-4"
                style={{ letterSpacing: '0.05em', fontSize: '0.7rem', textTransform: 'uppercase', width: '100px' }}>
              Rate (₹)
            </th>
            <th className="text-center text-white font-semibold py-3 px-4"
                style={{ letterSpacing: '0.05em', fontSize: '0.7rem', textTransform: 'uppercase', width: '110px' }}>
              Amount (₹)
            </th>
            {!isPrinting && (
              <th className="text-center text-white font-semibold py-3 px-4 rounded-tr-lg"
                  style={{ letterSpacing: '0.05em', fontSize: '0.7rem', textTransform: 'uppercase', width: '80px' }}>
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={isPrinting ? 4 : 5} className="text-center text-gray-400 py-8 text-sm border-b border-gray-100">
                {isPrinting ? 'No items added.' : 'No items yet — add your first line item below.'}
              </td>
            </tr>
          )}
          {items.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-100" style={{ background: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
              <td className="py-3 px-4 text-gray-800">{item.description}</td>
              <td className="py-3 px-4 text-center text-gray-700">{item.quantity}</td>
              <td className="py-3 px-4 text-center text-gray-700">₹{Number(item.rate).toFixed(2)}</td>
              <td className="py-3 px-4 text-center font-semibold text-gray-800">₹{item.amount.toFixed(2)}</td>
              {!isPrinting && (
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                  >
                    ✕ Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!isPrinting && (
        <div className="mt-5 p-5 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Add Line Item</h4>
          {error && (
            <p className="text-red-500 text-xs font-medium mb-3">⚠ {error}</p>
          )}
          <div className="grid grid-cols-12 gap-3">
            <input
              type="text"
              placeholder="Item description"
              className="col-span-6 border border-gray-200 bg-white text-gray-800 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <input
              type="number"
              placeholder="Qty"
              className="col-span-2 border border-gray-200 bg-white text-gray-800 p-2.5 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              value={newItem.quantity}
              min="1"
              onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Rate ₹"
              className="col-span-2 border border-gray-200 bg-white text-gray-800 p-2.5 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              value={newItem.rate}
              min="0"
              onChange={(e) => setNewItem({ ...newItem, rate: Number(e.target.value) })}
            />
            <button
              onClick={handleAddItem}
              className="col-span-2 flex items-center justify-center gap-1 text-white font-semibold rounded-lg text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              + Add
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-2">Tip: Press Enter in the description field to add quickly.</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;