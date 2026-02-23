function InvoiceTable({ items, addItem, updateItem, deleteItem }) {
  return (
    <div>
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", Number(e.target.value))
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(index, "rate", Number(e.target.value))
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="text-center">{item.amount}</td>
              <td className="text-center">
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addItem}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </div>
  );
}

export default InvoiceTable;