import React, { useState } from 'react';

export default function AwardTwoSig({ onAward }: { onAward: () => void }) {
  const [sig1, setSig1] = useState(false);
  const [sig2, setSig2] = useState(false);
  return (
    <div className="flex flex-col gap-2 border rounded p-2 w-max">
      <div className="flex items-center gap-3">
        <input type="checkbox" id="sig1" checked={sig1} onChange={e=>setSig1(e.target.checked)} />
        <label htmlFor="sig1" className="text-xs">Approve 1</label>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="sig2" checked={sig2} onChange={e=>setSig2(e.target.checked)} />
        <label htmlFor="sig2" className="text-xs">Approve 2</label>
      </div>
      <button
        className="bg-blue-500 text-white px-3 py-1 mt-1 rounded disabled:opacity-50 text-xs"
        disabled={!(sig1&&sig2)}
        onClick={onAward}
      >Award</button>
    </div>
  );
}
