import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "search" | "reports" | "settings";
type SearchType = "phone" | "name" | "birthdate";
type RiskLevel = "low" | "medium" | "high" | "critical";

interface SearchResult {
  id: string;
  name: string;
  phone: string;
  birthdate: string;
  risk: RiskLevel;
  riskScore: number;
  region: string;
  reports: number;
  lastActivity: string;
  tags: string[];
}

const mockResults: SearchResult[] = [
  {
    id: "VF-2024-001",
    name: "Иванов Сергей Петрович",
    phone: "+7 (916) 234-56-78",
    birthdate: "12.03.1978",
    risk: "high",
    riskScore: 78,
    region: "Москва",
    reports: 4,
    lastActivity: "18.03.2024",
    tags: ["Мошенничество", "Финансовые схемы"],
  },
  {
    id: "VF-2024-002",
    name: "Петров Алексей Николаевич",
    phone: "+7 (903) 111-22-33",
    birthdate: "05.07.1985",
    risk: "low",
    riskScore: 12,
    region: "Санкт-Петербург",
    reports: 0,
    lastActivity: "—",
    tags: [],
  },
  {
    id: "VF-2024-003",
    name: "Козлова Марина Андреевна",
    phone: "+7 (925) 777-88-99",
    birthdate: "22.11.1992",
    risk: "medium",
    riskScore: 45,
    region: "Екатеринбург",
    reports: 2,
    lastActivity: "02.03.2024",
    tags: ["Подозрительные операции"],
  },
];

const statsData = [
  { label: "Проверок сегодня", value: "147", delta: "+23", positive: true },
  { label: "Выявлено угроз", value: "31", delta: "+5", positive: false },
  { label: "Высокий риск", value: "12", delta: "-2", positive: true },
  { label: "База записей", value: "1.4M", delta: "", positive: true },
];

const recentChecks = [
  { id: "VF-7721", time: "14:32", name: "Сидоров В.А.", risk: "high" as RiskLevel },
  { id: "VF-7720", time: "14:18", name: "Морозова Е.И.", risk: "low" as RiskLevel },
  { id: "VF-7719", time: "13:57", name: "Волков О.Р.", risk: "medium" as RiskLevel },
  { id: "VF-7718", time: "13:41", name: "Громов А.К.", risk: "critical" as RiskLevel },
  { id: "VF-7717", time: "13:22", name: "Соколов Д.Н.", risk: "low" as RiskLevel },
];

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; bar: string }> = {
  low:      { label: "НИЗКИЙ",      color: "text-risk-low",      bg: "bg-risk-low/10",      bar: "bg-risk-low" },
  medium:   { label: "СРЕДНИЙ",     color: "text-risk-medium",   bg: "bg-risk-medium/10",   bar: "bg-risk-medium" },
  high:     { label: "ВЫСОКИЙ",     color: "text-risk-high",     bg: "bg-risk-high/10",     bar: "bg-risk-high" },
  critical: { label: "КРИТИЧЕСКИЙ", color: "text-risk-critical", bg: "bg-risk-critical/10", bar: "bg-risk-critical" },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [searchType, setSearchType] = useState<SearchType>("phone");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [twoFactor, setTwoFactor] = useState(true);
  const [logActivity, setLogActivity] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    setIsSearching(true);
    setResults(null);
    setSelectedResult(null);
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1800);
  };

  const searchPlaceholder: Record<SearchType, string> = {
    phone: "+7 (___) ___-__-__",
    name: "Фамилия Имя Отчество",
    birthdate: "ДД.ММ.ГГГГ",
  };

  const searchLabel: Record<SearchType, string> = {
    phone: "Номер телефона",
    name: "ФИО",
    birthdate: "Дата рождения",
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Menu" size={18} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Shield" size={14} className="text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-semibold tracking-widest text-foreground uppercase">ВериФакт</span>
              <span className="status-badge text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">v2.4</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs text-risk-low">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-low animate-pulse-dot inline-block" />
              <span className="mono">СИСТЕМА АКТИВНА</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              <Icon name="Bell" size={16} />
              <span className="w-4 h-4 bg-risk-high rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</span>
            </div>
            <div className="flex items-center gap-2 border-l border-border pl-5">
              <div className="w-8 h-8 rounded-sm bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="font-display text-sm text-primary font-semibold">АД</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-foreground">Администратор</div>
                <div className="text-[10px] text-muted-foreground mono">СБ · Уровень 3</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarOpen && (
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
                  onClick={() => setActiveTab(item.id)}
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
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">

          {/* SEARCH TAB */}
          {activeTab === "search" && (
            <div className="p-6 max-w-5xl mx-auto animate-fade-in">
              <div className="mb-6">
                <div className="accent-line mb-1">
                  <h1 className="font-display text-2xl font-semibold text-foreground uppercase tracking-wide">Верификация личности</h1>
                </div>
                <p className="text-sm text-muted-foreground pl-[15px]">Поиск и анализ данных физических лиц по базе угроз</p>
              </div>

              {/* Search block */}
              <div className="bg-card border border-border rounded-sm p-5 mb-5 scan-line">
                <div className="flex gap-2 mb-4">
                  {(["phone", "name", "birthdate"] as SearchType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setSearchType(type); setSearchValue(""); setResults(null); }}
                      className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${
                        searchType === type
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {searchLabel[type]}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Icon name={searchType === "phone" ? "Phone" : searchType === "name" ? "User" : "Calendar"} size={15} />
                    </div>
                    <input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder={searchPlaceholder[searchType]}
                      className="w-full bg-muted border border-border rounded-sm pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all mono"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
                  >
                    {isSearching ? (
                      <>
                        <Icon name="Loader2" size={14} className="animate-spin" />
                        Поиск...
                      </>
                    ) : (
                      <>
                        <Icon name="Search" size={14} />
                        Проверить
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Icon name="ShieldCheck" size={11} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Все запросы шифруются и логируются · Доступ только авторизованным сотрудникам</span>
                </div>
              </div>

              {/* Searching indicator */}
              {isSearching && (
                <div className="bg-card border border-primary/30 rounded-sm p-8 flex flex-col items-center justify-center gap-3 animate-fade-in">
                  <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <div className="text-sm text-muted-foreground">Выполняется верификация...</div>
                  <div className="flex gap-1">
                    {["База ФИО", "Телефоны", "Жалобы", "ФССП"].map((s) => (
                      <span key={s} className="status-badge bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {results && !isSearching && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-foreground">
                      Найдено записей: <span className="text-primary font-semibold">{results.length}</span>
                    </div>
                    <div className="mono text-[10px] text-muted-foreground">ID запроса: VF-{Date.now().toString().slice(-6)}</div>
                  </div>

                  <div className="grid gap-3">
                    {results.map((r, i) => {
                      const rc = riskConfig[r.risk];
                      const isSelected = selectedResult?.id === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => setSelectedResult(isSelected ? null : r)}
                          className={`bg-card border rounded-sm cursor-pointer transition-all ${
                            isSelected ? "border-primary" : "border-border hover:border-primary/40"
                          }`}
                          style={{ animationDelay: `${i * 0.08}s` }}
                        >
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${rc.bg}`}>
                                <Icon name="User" size={18} className={rc.color} />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">{r.name}</div>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="mono text-xs text-muted-foreground">{r.phone}</span>
                                  <span className="mono text-xs text-muted-foreground">{r.birthdate}</span>
                                  <span className="text-xs text-muted-foreground">{r.region}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className={`status-badge ${rc.bg} ${rc.color} px-2 py-0.5 rounded-sm`}>{rc.label}</div>
                                <div className="text-[10px] text-muted-foreground mt-1">Риск: {r.riskScore}%</div>
                              </div>
                              <Icon
                                name={isSelected ? "ChevronUp" : "ChevronDown"}
                                size={16}
                                className="text-muted-foreground"
                              />
                            </div>
                          </div>

                          {/* Risk bar */}
                          <div className="px-4 pb-3">
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${rc.bar}`}
                                style={{ width: `${r.riskScore}%` }}
                              />
                            </div>
                          </div>

                          {/* Expanded detail */}
                          {isSelected && (
                            <div className="border-t border-border p-4 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                              <div>
                                <div className="text-[10px] mono text-muted-foreground uppercase mb-1">ID записи</div>
                                <div className="text-sm mono text-foreground">{r.id}</div>
                              </div>
                              <div>
                                <div className="text-[10px] mono text-muted-foreground uppercase mb-1">Жалоб</div>
                                <div className={`text-sm font-semibold ${r.reports > 0 ? "text-risk-high" : "text-risk-low"}`}>{r.reports}</div>
                              </div>
                              <div>
                                <div className="text-[10px] mono text-muted-foreground uppercase mb-1">Последняя активность</div>
                                <div className="text-sm text-foreground">{r.lastActivity}</div>
                              </div>
                              <div>
                                <div className="text-[10px] mono text-muted-foreground uppercase mb-1">Метки</div>
                                <div className="flex flex-wrap gap-1">
                                  {r.tags.length > 0
                                    ? r.tags.map((tag) => (
                                        <span key={tag} className="status-badge bg-risk-high/10 text-risk-high px-1.5 py-0.5 rounded-sm">{tag}</span>
                                      ))
                                    : <span className="text-xs text-muted-foreground">Нет</span>
                                  }
                                </div>
                              </div>
                              <div className="col-span-2 md:col-span-4 flex gap-2 pt-2 border-t border-border">
                                <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-sm hover:bg-primary/20 transition-colors">
                                  <Icon name="FileText" size={12} />
                                  Полный отчёт
                                </button>
                                <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-muted text-muted-foreground border border-border rounded-sm hover:text-foreground transition-colors">
                                  <Icon name="Flag" size={12} />
                                  Добавить жалобу
                                </button>
                                <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-muted text-muted-foreground border border-border rounded-sm hover:text-foreground transition-colors">
                                  <Icon name="Download" size={12} />
                                  Экспорт
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!results && !isSearching && (
                <div className="bg-card border border-border rounded-sm p-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 bg-muted rounded-sm flex items-center justify-center">
                    <Icon name="ShieldQuestion" size={24} className="text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium text-foreground">Введите данные для проверки</div>
                  <div className="text-xs text-muted-foreground max-w-xs">Поиск осуществляется по номеру телефона, ФИО или дате рождения. Все запросы шифруются.</div>
                </div>
              )}
            </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === "reports" && (
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
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="p-6 max-w-3xl mx-auto animate-fade-in">
              <div className="mb-6">
                <div className="accent-line mb-1">
                  <h1 className="font-display text-2xl font-semibold text-foreground uppercase tracking-wide">Настройки безопасности</h1>
                </div>
                <p className="text-sm text-muted-foreground pl-[15px]">Управление аккаунтом и параметрами защиты</p>
              </div>

              {/* Account card */}
              <div className="bg-card border border-border rounded-sm mb-4">
                <div className="p-4 border-b border-border">
                  <div className="text-xs mono text-muted-foreground uppercase tracking-widest">Аккаунт</div>
                </div>
                <div className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-sm bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="font-display text-xl text-primary font-semibold">АД</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Администратор системы</div>
                    <div className="mono text-xs text-muted-foreground">admin@company.ru</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="status-badge bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">Уровень 3</span>
                      <span className="status-badge bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm">Служба безопасности</span>
                    </div>
                  </div>
                  <button className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                    <Icon name="Pencil" size={12} />
                    Изменить
                  </button>
                </div>
              </div>

              {/* Security toggles */}
              <div className="bg-card border border-border rounded-sm mb-4">
                <div className="p-4 border-b border-border">
                  <div className="text-xs mono text-muted-foreground uppercase tracking-widest">Параметры безопасности</div>
                </div>
                <div className="divide-y divide-border">
                  {[
                    {
                      icon: "Smartphone",
                      label: "Двухфакторная аутентификация",
                      desc: "OTP-код при каждом входе в систему",
                      active: twoFactor,
                      toggle: () => setTwoFactor(!twoFactor),
                    },
                    {
                      icon: "FileSearch",
                      label: "Журналирование активности",
                      desc: "Запись всех запросов и действий пользователей",
                      active: logActivity,
                      toggle: () => setLogActivity(!logActivity),
                    },
                    {
                      icon: "Lock",
                      label: "Сквозное шифрование",
                      desc: "AES-256 для хранения и передачи данных",
                      active: encryptionEnabled,
                      toggle: () => setEncryptionEnabled(!encryptionEnabled),
                    },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                          <Icon name={s.icon} size={15} className="text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{s.label}</div>
                          <div className="text-xs text-muted-foreground">{s.desc}</div>
                        </div>
                      </div>
                      <button
                        onClick={s.toggle}
                        className={`relative w-10 h-5 rounded-full transition-all flex-shrink-0 ${s.active ? "bg-primary" : "bg-muted border border-border"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${s.active ? "left-5" : "left-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encryption status */}
              <div className="bg-card border border-border rounded-sm">
                <div className="p-4 border-b border-border">
                  <div className="text-xs mono text-muted-foreground uppercase tracking-widest">Статус шифрования</div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-4">
                  {[
                    { label: "Протокол", value: "TLS 1.3" },
                    { label: "Хранение", value: "AES-256" },
                    { label: "Ключи", value: "RSA-4096" },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3 bg-muted rounded-sm">
                      <div className="text-[10px] mono text-muted-foreground uppercase mb-1">{item.label}</div>
                      <div className="font-mono text-sm font-semibold text-risk-low">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="flex items-center gap-2 text-xs text-risk-high hover:text-risk-high/80 transition-colors">
                    <Icon name="KeyRound" size={13} />
                    Сменить пароль
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
