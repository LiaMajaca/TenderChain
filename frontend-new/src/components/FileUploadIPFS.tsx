import React, { useRef, useState } from 'react';

// Replace with your Pinata JWT for live use
const PINATA_JWT = 'PINATA_JWT_HERE';
const PINATA_ENDPOINT = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export default function FileUploadIPFS() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hash, setHash] = useState<string|undefined>();
  const [loading, setLoading] = useState(false);
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true); setHash(undefined);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(PINATA_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`
      },
      body: formData
    });
    const json = await res.json();
    setHash(json.IpfsHash || 'Error uploading');
    setLoading(false);
  }
  return (
    <div className="flex flex-col gap-2">
      <input ref={inputRef} type="file" className="hidden" onChange={handleFile} />
      <button
        className="px-4 py-2 border rounded bg-blue-200 hover:bg-blue-400 disabled:opacity-50"
        onClick={() => inputRef.current?.click()} disabled={loading}
      >Upload File to IPFS</button>
      {loading && <span className="text-sm">Uploading...</span>}
      {hash && (
        <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank" rel="noopener noreferrer" className="break-words text-xs text-blue-700 underline">{hash}</a>
      )}
    </div>
  );
}
