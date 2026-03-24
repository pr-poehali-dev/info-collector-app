import { useState } from "react";
import { Tab } from "@/components/verifact/types";
import AppHeader from "@/components/verifact/AppHeader";
import AppSidebar from "@/components/verifact/AppSidebar";
import SearchTab from "@/components/verifact/SearchTab";
import ReportsTab from "@/components/verifact/ReportsTab";
import SettingsTab from "@/components/verifact/SettingsTab";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background grid-pattern flex flex-col">
      <AppHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
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
