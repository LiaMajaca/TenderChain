import React, { useState } from "react";
import { SAMPLE_TENDERS, SAMPLE_APPLICATIONS } from '../data/sampleTenders';
import type { Tender, Application } from '../data/sampleTenders';

const statusColor = [
  "bg-green-100 text-green-800", // Open
  "bg-blue-100 text-blue-800",  // Awarded
  "bg-gray-200 text-gray-700",  // Closed
  "bg-gray-400 text-white"      // fallback
];

export default function PublicDashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Normalize status index: 'Open'=0, 'Under Review'=1, ...
  const statusIndex = (status: Tender['status']) =>
    status === 'Open' ? 0 : status === 'Under Review' ? 1 : status === 'Awarded' ? 2 : 3;

  const filteredTenders = SAMPLE_TENDERS.filter(t =>
    (!search || t.title.toLowerCase().includes(search.toLowerCase())) &&
    (!statusFilter || statusIndex(t.status) === Number(statusFilter))
  );

  // FIXED: Build the object directly instead of using Object.fromEntries
  const appsByTender = SAMPLE_APPLICATIONS.reduce((acc, a) => {
    if (!acc[a.tenderId]) acc[a.tenderId] = [];
    acc[a.tenderId].push(a);
    return acc;
  }, {} as Record<string, Application[]>);

  return (
    <div className="max-w-2xl mx-auto py-8 px-3">
      <h2 className="text-2xl font-bold mb-6">All Tenders</h2>
      <div className="mb-4 flex gap-2 flex-col sm:flex-row items-stretch sm:items-end">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-60"
        />
        <select
          className="border rounded px-3 py-2 w-full sm:w-40"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="0">Open</option>
          <option value="1">Under Review</option>
          <option value="2">Awarded</option>
          <option value="3">Closed</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Deadline</th>
              <th className="p-2 text-left"># Apps</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenders.map((t) => (
              <tr key={t.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => setSelected(t.id)}>
                <td className="p-2 font-semibold">{t.title}</td>
                <td className="p-2">
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${statusColor[statusIndex(t.status)]}`}>{t.status}</span>
                </td>
                <td className="p-2">{new Date(t.deadline * 1000).toLocaleDateString()}</td>
                <td className="p-2">{t.applicationCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white p-6 py-4 rounded shadow-lg relative w-full max-w-md" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-400 font-bold" onClick={() => setSelected(null)}>&times;</button>
            <h3 className="mb-3 text-xl font-bold">Applications for "{SAMPLE_TENDERS.find(t => t.id === selected)?.title}"</h3>
            <ul className="space-y-2 mt-2">
              {(appsByTender[selected] || []).length === 0 && <li className="text-gray-500 italic">No applications yet.</li>}
              {(appsByTender[selected] || []).map(app => (
                <li key={app.id} className="border p-2 rounded text-xs bg-gray-50">
                  {app.applicantWallet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}