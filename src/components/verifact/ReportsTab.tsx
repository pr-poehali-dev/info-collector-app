import Icon from "@/components/ui/icon";
import { RiskLevel, statsData, recentChecks, riskConfig } from "./types";

export default function ReportsTab() {
  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="accent-line mb-1">
          <h1 className="font-display text-2xl font-semibold text-foreground uppercase tracking-wide">Отчёты и статистика</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-[15px]">Аналитика проверок за текущий период</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {statsData.map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-sm p-4">
            <div className="text-[10px] mono text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="flex items-end gap-2">
              <div className="font-display text-3xl font-semibold text-foreground">{stat.value}</div>
              {stat.delta && (
                <div className={`text-xs mb-1 mono ${stat.positive ? "text-risk-low" : "text-risk-high"}`}>
                  {stat.delta}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Risk breakdown + Bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-card border border-border rounded-sm p-5">
          <div className="text-xs mono text-muted-foreground uppercase tracking-widest mb-4">Распределение по уровню риска</div>
          <div className="space-y-3">
            {[
              { level: "critical" as RiskLevel, count: 8, pct: 5 },
              { level: "high" as RiskLevel, count: 23, pct: 16 },
              { level: "medium" as RiskLevel, count: 54, pct: 37 },
              { level: "low" as RiskLevel, count: 62, pct: 42 },
            ].map((item) => {
              const rc = riskConfig[item.level];
              return (
                <div key={item.level} className="flex items-center gap-3">
                  <div className={`status-badge ${rc.color} w-20 text-right`}>{rc.label}</div>
                  <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden">
                    <div className={`h-full ${rc.bar} flex items-center px-2`} style={{ width: `${item.pct}%` }}>
                      <span className="text-[10px] text-white font-medium">{item.count}</span>
                    </div>
                  </div>
                  <div className="mono text-xs text-muted-foreground w-8 text-right">{item.pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-sm p-5">
          <div className="text-xs mono text-muted-foreground uppercase tracking-widest mb-4">Активность за 7 дней</div>
          <div className="flex items-end gap-1.5 h-28">
            {[22, 35, 18, 47, 31, 58, 43].map((v, i) => {
              const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/30 hover:bg-primary/60 transition-colors rounded-sm"
                    style={{ height: `${(v / 58) * 100}%` }}
                  />
                  <div className="text-[9px] mono text-muted-foreground">{days[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Log table */}
      <div className="bg-card border border-border rounded-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="text-xs mono text-muted-foreground uppercase tracking-widest">Журнал проверок</div>
          <button className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
            <Icon name="Download" size={12} />
            Экспорт CSV
          </button>
        </div>
        <div className="divide-y divide-border">
          {recentChecks.map((check) => {
            const rc = riskConfig[check.risk];
            return (
              <div key={check.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="mono text-xs text-muted-foreground">{check.id}</span>
                  <span className="text-sm text-foreground">{check.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="mono text-xs text-muted-foreground">{check.time}</span>
                  <span className={`status-badge ${rc.bg} ${rc.color} px-2 py-0.5 rounded-sm`}>{rc.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
