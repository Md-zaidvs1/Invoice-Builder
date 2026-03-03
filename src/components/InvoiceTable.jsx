import React, { useState } from 'react';

const InvoiceTable = ({ items, setItems }) => {
  const [newItem, setNewItem] = useState({ description: '', quantity: 1, rate: 0 });
  const [error, setError] = useState('');

  const handleAddItem = () => {
    // --- INPUT VALIDATION LOGIC ---
    if (!newItem.description.trim()) {
      setError("Description is required!");
      return;
    }
    if (newItem.quantity <= 0) {
      setError("Quantity must be greater than 0!");
      return;
    }
    if (newItem.rate < 0) {
      setError("Rate cannot be negative!");
      return;
    }

    // If valid, add the item
    const amount = newItem.quantity * newItem.rate;
    setItems([...items, { ...newItem, id: Date.now(), amount }]);
    
    // Reset fields and clear errors
    setNewItem({ description: '', quantity: 1, rate: 0 });
    setError('');
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-6">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-center">Qty</th>
            <th className="border p-2 text-center">Rate</th>
            <th className="border p-2 text-center">Amount</th>
            <th className="border p-2 text-center print:hidden">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2 text-center">{item.quantity}</td>
              <td className="border p-2 text-center">{item.rate}</td>
              <td className="border p-2 text-center">{item.amount.toFixed(2)}</td>
              <td className="border p-2 text-center print:hidden">
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- ADD ITEM SECTION (HIDDEN IN PDF) --- */}
      <div className="mt-4 p-4 border rounded bg-gray-50 print:hidden">
        <h3 className="font-bold mb-2">Add New Line Item</h3>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="grid grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded col-span-2"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Qty"
            className="border p-2 rounded"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Rate"
            className="border p-2 rounded"
            value={newItem.rate}
            onChange={(e) => setNewItem({ ...newItem, rate: Number(e.target.value) })}
          />
        </div>
        <button
          onClick={handleAddItem}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;