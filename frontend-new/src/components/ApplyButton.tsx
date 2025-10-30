import React, { useState } from "react";

type ApplyButtonProps = { tenderPubkey: string };

export default function ApplyButton({ tenderPubkey }: ApplyButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleApply = async () => {
    setLoading(true);
    // TODO: Call Solana program to submit application
    alert(`Would apply to tender: ${tenderPubkey}`);
    setLoading(false);
  };
  return (
    <button className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50" disabled={loading} onClick={handleApply}>
      {loading ? "Applying..." : "Apply"}
    </button>
  );
}
