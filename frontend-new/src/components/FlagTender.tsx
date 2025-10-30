import React, { useState } from 'react';

export default function FlagTender() {
  const [flags, setFlags] = useState(0);
  return (
    <button className="flex items-center gap-1 px-2 py-1 text-xs border rounded bg-red-50 hover:bg-red-100 text-red-700" onClick={() => setFlags(f=>f+1)}>
      🚩 Flag <span className="ml-1 font-bold">{flags}</span>
    </button>
  );
}
