import React, { useState, useRef, useCallback } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceTable from './components/InvoiceTable';
import Totals from './components/Totals';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [client, setClient] = useState({ name: '', address: '', invoiceNumber: '', date: '' });
  const [items, setItems] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const invoiceRef = useRef();

  const downloadPDF = useCallback(async () => {
    setIsPrinting(true);

    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    try {
      const input = invoiceRef.current;
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${client.invoiceNumber || 'New'}.pdf`);
    } finally {
      setIsPrinting(false);
    }
  }, [client.invoiceNumber]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)' }}>
      <header className="py-5 px-8 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight leading-none">InvoiceBuilder</h1>
            <p className="text-slate-400 text-xs mt-0.5">Professional Invoicing</p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          disabled={isPrinting}
          className="flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: isPrinting ? '#475569' : 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {isPrinting ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Generating…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </>
          )}
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div ref={invoiceRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div
            className="px-10 py-8 flex items-start justify-between"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
          >
            <div>
              <h2 className="text-5xl font-black tracking-widest text-white uppercase" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}>
                INVOICE
              </h2>
              <p className="text-slate-400 text-sm mt-1">Professional Invoice Document</p>
            </div>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
          </div>

          <div className="px-10 py-8">
            <InvoiceForm client={client} setClient={setClient} isPrinting={isPrinting} />
            <InvoiceTable items={items} setItems={setItems} isPrinting={isPrinting} />
            <Totals items={items} />
            <div className="mt-10 pt-5 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs tracking-wide">Thank you for your business</p>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-5">
          Add your line items above, then click{' '}
          <span className="text-indigo-400 font-semibold">Download PDF</span> to export a clean invoice.
        </p>
      </main>
    </div>
  );
}

export default App;