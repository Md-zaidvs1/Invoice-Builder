function InvoiceForm({ client, setClient, isPrinting }) {
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  if (isPrinting) {
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8 text-gray-700 text-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Bill To</span>
          <p className="font-semibold text-gray-800 text-base">{client.name || '—'}</p>
          <p className="text-gray-600">{client.address || '—'}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Invoice No.</span>
            <p className="font-semibold text-gray-800">#{client.invoiceNumber || '—'}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Date</span>
            <p className="text-gray-700">{client.date || '—'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Client Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Client Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Acme Corp"
            value={client.name}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            placeholder="e.g. INV-001"
            value={client.invoiceNumber}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Client Address</label>
          <input
            type="text"
            name="address"
            placeholder="123 Main St, City, State"
            value={client.address}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Invoice Date</label>
          <input
            type="date"
            name="date"
            value={client.date}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;