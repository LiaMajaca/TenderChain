import React, { useState } from "react";

export default function CreateTenderForm() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Inject wallet logic and transaction to create a tender with title and deadline
    alert(`Would create tender: ${title}, deadline ${deadline}`);
    setLoading(false);
  };
  return (
    <form className="space-y-2 p-4 border rounded" onSubmit={handleSubmit}>
      <div>
        <label className="block">Title</label>
        <input className="border px-2 py-1 rounded w-full" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block">Deadline (Unix timestamp)</label>
        <input className="border px-2 py-1 rounded w-full" value={deadline} onChange={e => setDeadline(e.target.value)} required />
      </div>
      <button className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50" disabled={loading}>{loading ? "Creating..." : "Create Tender"}</button>
    </form>
  );
}
