import React, { useState } from "react";
import StatCards from "./components/StatCards";
import WalletHeader from "./components/WalletHeader";
import PublicDashboard from "./pages/PublicDashboard";
import MyApplications from "./pages/MyApplications";
import FileUploadIPFS from "./components/FileUploadIPFS";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, message?: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: String(error) };
  }
  componentDidCatch(error: any, info: any) {
    console.error('Render error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-sm text-red-700 bg-red-50 border">An error occurred rendering the app: {this.state.message}</div>;
    }
    return this.props.children as any;
  }
}

function MiniNav({ page, setPage }: { page: string, setPage: (p: string) => void }) {
  return (
    <nav className="flex gap-2 py-3 justify-center">
      {['Home', 'Applications', 'Upload'].map(name => (
        <button key={name} onClick={()=>setPage(name)} className={"px-2 py-1 border rounded text-xs " + (page===name ? "bg-blue-200" : "bg-gray-50 hover:bg-gray-100")}>{name}</button>
      ))}
    </nav>
  );
}

const demoStats = [
  { label: "Tenders", value: 12 },
  { label: "Total Value", value: "$250k" },
  { label: "Open", value: 7 },
  { label: "Applications", value: 22 },
];

export default function App() {
  const [page, setPage] = useState('Home');
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <WalletHeader />
        <div className="flex-1 w-full max-w-4xl mx-auto px-2">
          <StatCards stats={demoStats} />
          <MiniNav page={page} setPage={setPage} />
          <div className="my-6">
            {page === 'Home' && <PublicDashboard />}
            {page === 'Applications' && <MyApplications />}
            {page === 'Upload' && <FileUploadIPFS />}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
