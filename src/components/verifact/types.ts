export type Tab = "search" | "reports" | "settings";
export type SearchType = "phone" | "name" | "birthdate";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface SearchResult {
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

export const mockResults: SearchResult[] = [
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

export const statsData = [
  { label: "Проверок сегодня", value: "147", delta: "+23", positive: true },
  { label: "Выявлено угроз", value: "31", delta: "+5", positive: false },
  { label: "Высокий риск", value: "12", delta: "-2", positive: true },
  { label: "База записей", value: "1.4M", delta: "", positive: true },
];

export const recentChecks = [
  { id: "VF-7721", time: "14:32", name: "Сидоров В.А.", risk: "high" as RiskLevel },
  { id: "VF-7720", time: "14:18", name: "Морозова Е.И.", risk: "low" as RiskLevel },
  { id: "VF-7719", time: "13:57", name: "Волков О.Р.", risk: "medium" as RiskLevel },
  { id: "VF-7718", time: "13:41", name: "Громов А.К.", risk: "critical" as RiskLevel },
  { id: "VF-7717", time: "13:22", name: "Соколов Д.Н.", risk: "low" as RiskLevel },
];

export const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; bar: string }> = {
  low:      { label: "НИЗКИЙ",      color: "text-risk-low",      bg: "bg-risk-low/10",      bar: "bg-risk-low" },
  medium:   { label: "СРЕДНИЙ",     color: "text-risk-medium",   bg: "bg-risk-medium/10",   bar: "bg-risk-medium" },
  high:     { label: "ВЫСОКИЙ",     color: "text-risk-high",     bg: "bg-risk-high/10",     bar: "bg-risk-high" },
  critical: { label: "КРИТИЧЕСКИЙ", color: "text-risk-critical", bg: "bg-risk-critical/10", bar: "bg-risk-critical" },
};
