import React from "react";
import TenderList from "./components/TenderList";
import CreateTenderForm from "./components/CreateTenderForm";
import ApplyButton from "./components/ApplyButton";

function App() {
  // TODO: Add wallet connect button (Phantom, etc.)
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Solana Tender System</h1>
      {/* Add a PhantomConnectButton here in the future */}
      <CreateTenderForm />
      <TenderList />
      {/* Demo usage of ApplyButton (replace with correct tender key logic) */}
      {/* <ApplyButton tenderPubkey="TENDER_ACCOUNT_KEY_HERE" /> */}
    </div>
  );
}
export default App;
