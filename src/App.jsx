
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar navigation */}
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {/* Main application content */}
        <main className="min-w-0 flex-1">
          {/* Top navigation bar */}
          <Navbar title={activePage} />

          {/* Dashboard page */}
          {activePage === "Dashboard" && <Dashboard />}

          {/* Employees page */}
          {activePage === "Employees" && <Employees />}

          {/* Settings page */}
          {activePage === "Settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
