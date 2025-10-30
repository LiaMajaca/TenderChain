import React, { useState } from "react";

export default function WalletHeader() {
  // In real dapp, use wallet adapter hooks
  const [wallet, setWallet] = useState<string | null>(null);
  return (
    <div className="flex justify-end items-center p-2 bg-gray-50 border-b">
      {wallet ? (
        <span className="px-3 py-1 bg-gray-200 rounded text-xs">
          {wallet.slice(0, 4)}...{wallet.slice(-4)}
          <button className="ml-2 underline text-blue-600" onClick={()=>setWallet(null)}>Disconnect</button>
        </span>
      ) : (
        <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs" onClick={()=>setWallet("7JHf...abcDEFGH")}>Connect Wallet</button>
      )}
    </div>
  );
}
