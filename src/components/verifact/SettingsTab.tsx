import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function SettingsTab() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [logActivity, setLogActivity] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  return (
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
  );
}
