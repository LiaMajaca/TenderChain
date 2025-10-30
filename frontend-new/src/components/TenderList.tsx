import React, { useEffect, useState } from "react";
// import { Connection, PublicKey } from "@solana/web3.js";

// Replace with real program values and parsing logic
type Tender = { pubkey: string; title: string; status: number };

const dummyTenders: Tender[] = [
  { pubkey: '1', title: 'Road Repair', status: 0 },
  { pubkey: '2', title: 'IT Consulting', status: 1 },
];

export default function TenderList() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  useEffect(() => {
    // TODO: Fetch from Solana
    setTenders(dummyTenders);
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Tenders</h2>
      <ul>
        {tenders.map(tender => (
          <li key={tender.pubkey} className="border p-2 my-2 rounded">
            <span className="font-semibold">{tender.title}</span> <span className="ml-2 text-xs">Status: {tender.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
