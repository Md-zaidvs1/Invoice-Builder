function InvoiceForm({ client, setClient }) {
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <input
        type="text"
        name="name"
        placeholder="Client Name"
        value={client.name}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={client.invoiceNumber}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Client Address"
        value={client.address}
        onChange={handleChange}
        className="border p-2 rounded col-span-2"
      />
      <input
        type="date"
        name="date"
        value={client.date}
        onChange={handleChange}
        className="border p-2 rounded"
      />
    </div>
  );
}

export default InvoiceForm;