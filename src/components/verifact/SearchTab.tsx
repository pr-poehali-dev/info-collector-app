import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SearchType, SearchResult, mockResults, riskConfig } from "./types";

export default function SearchTab() {
  const [searchType, setSearchType] = useState<SearchType>("phone");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

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
  );
}
