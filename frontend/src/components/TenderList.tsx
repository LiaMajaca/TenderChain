import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

// Placeholder constants (adjust as needed)
const PROGRAM_ID = new PublicKey("ENTER_YOUR_PROGRAM_ID_HERE");
const TENDER_ACCOUNT_SIZE = 256; // Match your Solana program
const endpoint = "https://api.devnet.solana.com";

function parseTenderAccount(data: Buffer) {
  // Minimal parse - adjust for your struct
  const titleLength = data.readUInt32LE(0); // simple borsh string prefix
  const title = data.subarray(4, 4 + titleLength).toString();
  const status = data.readUInt8(4 + titleLength + 32); // adjust for struct layout
  return { title, status };
}

export default function TenderList() {
  const [tenders, setTenders] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const conn = new Connection(endpoint, "confirmed");
      const accounts = await conn.getProgramAccounts(PROGRAM_ID, {
        filters: [{ dataSize: TENDER_ACCOUNT_SIZE }],
      });
      setTenders(accounts.map(acc => ({
        pubkey: acc.pubkey.toBase58(),
        ...parseTenderAccount(acc.account.data),
      })));
    })();
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Tenders</h2>
      <ul>
        {tenders.map(tender => (
          <li key={tender.pubkey} className="border p-2 my-2 rounded">
            <span className="font-semibold">{tender.title || "Untitled"}</span> <span className="ml-2 text-xs">Status: {tender.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
