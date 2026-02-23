import { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTable from "./components/InvoiceTable";
import Totals from "./components/Totals";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [client, setClient] = useState({
    name: "",
    address: "",
    invoiceNumber: "",
    date: ""
  });

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, rate: 0, amount: 0 }
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === "quantity" || field === "rate") {
      updated[index].amount =
        updated[index].quantity * updated[index].rate;
    }

    setItems(updated);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const downloadPDF = async () => {
    const input = document.getElementById("invoice");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div id="invoice" className="max-w-4xl mx-auto bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Invoice Builder</h1>

        <InvoiceForm client={client} setClient={setClient} />

        <InvoiceTable
          items={items}
          addItem={addItem}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />

        <Totals subtotal={subtotal} tax={tax} total={total} />
      </div>

      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default App;