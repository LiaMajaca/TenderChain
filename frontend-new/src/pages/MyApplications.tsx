import React, { useState, useEffect } from "react";
import { SAMPLE_APPLICATIONS, SAMPLE_TENDERS } from '../data/sampleTenders';

const MOCK_WALLET = "F8gM93tJkt6yTzcE4HCe6JKYpgUxvaQ13YXiaZTdaTgLa"; // use one actually in SAMPLE_APPLICATIONS for demo
const statusColor = [
  "bg-green-100 text-green-800", // Open
  "bg-blue-100 text-blue-800",  // Awarded
  "bg-gray-200 text-gray-700",  // Closed
];
const statusText = ["Open", "Awarded", "Closed"];

export default function MyApplications() {
  const [myApps, setMyApps] = useState<any[]>([]);
  useEffect(() => {
    const mine = SAMPLE_APPLICATIONS.filter(a => a.applicantWallet === MOCK_WALLET);
    setMyApps(
      mine.map(a => {
        const tender = SAMPLE_TENDERS.find(t => t.id === a.tenderId) || null;
        return {...a, tender};
      })
    );
  }, []);
  return (
    <div className="max-w-lg mx-auto py-8 px-3">
      <h2 className="text-xl font-bold mb-6">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Tender</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">App Status</th>
            </tr>
          </thead>
          <tbody>
            {myApps.length === 0 ? (
              <tr><td className="p-2 text-gray-500 italic" colSpan={3}>No applications found for wallet {MOCK_WALLET}</td></tr>
            ) : myApps.map(a => (
              <tr key={a.id}>
                <td className="p-2 font-semibold">{a.tender ? a.tender.title : "Unknown"}</td>
                <td className="p-2">
                  {a.tender && (
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${a.tender.status==='Open'? statusColor[0]:a.tender.status==='Awarded'? statusColor[1]:statusColor[2]}`}>{a.tender.status}</span>
                  )}
                </td>
                <td className="p-2 text-xs">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
