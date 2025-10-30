import React from 'react';

export default function ExportCsvButton({ data, filename = "tenders.csv" }: { data: any[], filename?: string }) {
  function toCsv(arr: any[]) {
    if (!arr.length) return '';
    const keys = Object.keys(arr[0]);
    const csvRows = [keys.join(','), ...arr.map(row=>keys.map(k=>JSON.stringify(row[k])).join(','))];
    return csvRows.join('\n');
  }
  function handleExport() {
    const csv = toCsv(data);
    const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button className="px-3 py-1 bg-gray-200 rounded text-xs border hover:bg-gray-100" onClick={handleExport} disabled={!data.length}>Export CSV</button>
  );
}
