import Icon from "@/components/ui/icon";
import { Tab, recentChecks, riskConfig } from "./types";

interface AppSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <aside className="w-56 border-r border-border bg-card/50 flex-shrink-0 flex flex-col animate-slide-in">
      <nav className="p-3 flex-1">
        <div className="text-[10px] mono text-muted-foreground uppercase tracking-widest px-3 py-2 mt-1 mb-1">Навигация</div>
        {[
          { id: "search" as Tab, icon: "Search", label: "Поиск и верификация" },
          { id: "reports" as Tab, icon: "BarChart3", label: "Отчёты и статистика" },
          { id: "settings" as Tab, icon: "Settings", label: "Настройки" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all mb-0.5 text-left ${
              activeTab === item.id
                ? "bg-primary/15 text-primary border-l-2 border-primary pl-[10px]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon name={item.icon} size={15} />
            <span>{item.label}</span>
          </button>
        ))}

        <div className="text-[10px] mono text-muted-foreground uppercase tracking-widest px-3 py-2 mt-4 mb-1">Последние проверки</div>
        {recentChecks.map((check) => (
          <div key={check.id} className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-muted rounded-sm cursor-pointer transition-colors">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${riskConfig[check.risk].bar}`} />
            <div className="flex-1 min-w-0">
              <div className="text-foreground/80 truncate">{check.name}</div>
              <div className="mono text-muted-foreground text-[10px]">{check.id} · {check.time}</div>
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="bg-muted/50 rounded-sm p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Lock" size={12} className="text-primary" />
            <span className="text-[10px] mono text-muted-foreground uppercase tracking-widest">Шифрование</span>
          </div>
          <div className="text-[10px] text-muted-foreground">AES-256 · TLS 1.3</div>
          <div className="text-[10px] text-risk-low mono">Активно</div>
        </div>
      </div>
    </aside>
  );
}
