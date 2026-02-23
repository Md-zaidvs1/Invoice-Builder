function Totals({ subtotal, tax, total }) {
  return (
    <div className="text-right mt-6 space-y-2">
      <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
      <p>Tax (18%): ₹ {tax.toFixed(2)}</p>
      <h2 className="text-xl font-bold">Total: ₹ {total.toFixed(2)}</h2>
    </div>
  );
}

export default Totals;