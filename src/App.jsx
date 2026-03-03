import React, { useState, useRef } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceTable from './components/InvoiceTable';
import Totals from './components/Totals';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [client, setClient] = useState({ name: '', address: '', invoiceNumber: '', date: '' });
  const [items, setItems] = useState([]);
  const invoiceRef = useRef(); // This captures the invoice area

  const downloadPDF = () => {
    const input = invoiceRef.current;
    // html2canvas takes a screenshot of the 'invoiceRef' area
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${client.invoiceNumber || 'New'}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Buttons - These stay outside the ref or use print:hidden */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>

        {/* This div is what becomes the PDF */}
        <div ref={invoiceRef} className="bg-white p-10 shadow-lg rounded-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">INVOICE</h1>
          
          <InvoiceForm client={client} setClient={setClient} />
          <InvoiceTable items={items} setItems={setItems} />
          <Totals items={items} />
        </div>
      </div>
    </div>
  );
}

export default App;