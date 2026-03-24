import { useState } from "react";
import { Tab } from "@/components/verifact/types";
import AppHeader from "@/components/verifact/AppHeader";
import AppSidebar from "@/components/verifact/AppSidebar";
import SearchTab from "@/components/verifact/SearchTab";
import ReportsTab from "@/components/verifact/ReportsTab";
import SettingsTab from "@/components/verifact/SettingsTab";
import LoginScreen from "@/components/verifact/LoginScreen";

const VALID_CREDENTIALS = [
  { login: "admin", password: "admin123" },
  { login: "operator", password: "oper456" },
];

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (login: string, password: string): boolean => {
    const match = VALID_CREDENTIALS.find(
      (c) => c.login === login && c.password === password
    );
    if (match) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("search");
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background grid-pattern flex flex-col">
      <AppHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />

      <div className="flex flex-1">
        {sidebarOpen && (
          <AppSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}

        <main className="flex-1 overflow-auto">
          {activeTab === "search" && <SearchTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
