import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Credential } from "@/pages/Index";

interface SettingsTabProps {
  credentials: Credential[];
  onCredentialsChange: (creds: Credential[]) => void;
}

interface EditingUser {
  id: string;
  login: string;
  password: string;
  name: string;
  role: string;
}

export default function SettingsTab({ credentials, onCredentialsChange }: SettingsTabProps) {
  const [twoFactor, setTwoFactor] = useState(true);
  const [logActivity, setLogActivity] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({ login: "", password: "", name: "", role: "" });
  const [savedId, setSavedId] = useState<string | null>(null);

  const startEdit = (cred: Credential) => {
    setEditingId(cred.id);
    setEditingUser({ ...cred });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingUser(null);
  };

  const saveEdit = () => {
    if (!editingUser) return;
    onCredentialsChange(credentials.map((c) => c.id === editingUser.id ? editingUser : c));
    setSavedId(editingUser.id);
    setTimeout(() => setSavedId(null), 2000);
    setEditingId(null);
    setEditingUser(null);
  };

  const deleteUser = (id: string) => {
    if (credentials.length <= 1) return;
    onCredentialsChange(credentials.filter((c) => c.id !== id));
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditingUser(null);
    setNewUser({ login: "", password: "", name: "", role: "" });
  };

  const saveNew = () => {
    if (!newUser.login.trim() || !newUser.password.trim()) return;
    const id = Date.now().toString();
    onCredentialsChange([...credentials, {
      id,
      login: newUser.login.trim(),
      password: newUser.password.trim(),
      name: newUser.name.trim() || newUser.login.trim(),
      role: newUser.role.trim() || "СБ · Уровень 1",
    }]);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2000);
    setIsAdding(false);
  };

  const toggleShowPass = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "??";

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="accent-line mb-1">
          <h1 className="font-display text-2xl font-semibold text-foreground uppercase tracking-wide">Настройки безопасности</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-[15px]">Управление аккаунтом и параметрами защиты</p>
      </div>

      {/* Users management */}
      <div className="bg-card border border-border rounded-sm mb-4">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="text-xs mono text-muted-foreground uppercase tracking-widest">Пользователи системы</div>
          <button
            onClick={startAdd}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-sm hover:bg-primary/20 transition-colors"
          >
            <Icon name="Plus" size={12} />
            Добавить
          </button>
        </div>

        <div className="divide-y divide-border">
          {credentials.map((cred) => {
            const isEditing = editingId === cred.id;
            const isSaved = savedId === cred.id;
            return (
              <div key={cred.id} className="p-4">
                {isEditing && editingUser ? (
                  /* Edit form */
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Имя</label>
                        <input
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Роль</label>
                        <input
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                          className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Логин</label>
                        <input
                          value={editingUser.login}
                          onChange={(e) => setEditingUser({ ...editingUser, login: e.target.value })}
                          className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground mono focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Пароль</label>
                        <div className="relative">
                          <input
                            type={showPasswords[cred.id] ? "text" : "password"}
                            value={editingUser.password}
                            onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                            className="w-full bg-muted border border-border rounded-sm px-3 pr-9 py-2 text-sm text-foreground mono focus:outline-none focus:border-primary transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => toggleShowPass(cred.id)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Icon name={showPasswords[cred.id] ? "EyeOff" : "Eye"} size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                      >
                        <Icon name="Check" size={12} />
                        Сохранить
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-muted text-muted-foreground border border-border rounded-sm hover:text-foreground transition-colors"
                      >
                        <Icon name="X" size={12} />
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View row */
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-sm bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-xs text-primary font-semibold">{initials(cred.name)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{cred.name}</span>
                        {isSaved && (
                          <span className="flex items-center gap-1 text-[10px] text-risk-low mono animate-fade-in">
                            <Icon name="Check" size={10} />
                            Сохранено
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="mono text-xs text-muted-foreground">{cred.login}</span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="mono text-xs text-muted-foreground">{"•".repeat(Math.min(cred.password.length, 8))}</span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{cred.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => startEdit(cred)}
                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                      >
                        <Icon name="Pencil" size={11} />
                        Изменить
                      </button>
                      <button
                        onClick={() => deleteUser(cred.id)}
                        disabled={credentials.length <= 1}
                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-border rounded-sm text-muted-foreground hover:text-risk-high hover:border-risk-high/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Icon name="Trash2" size={11} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add new user form */}
          {isAdding && (
            <div className="p-4 animate-fade-in">
              <div className="text-[10px] mono text-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Icon name="UserPlus" size={11} />
                Новый пользователь
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Имя</label>
                    <input
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Иванов Иван"
                      className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Роль</label>
                    <input
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      placeholder="СБ · Уровень 1"
                      className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Логин <span className="text-risk-high">*</span></label>
                    <input
                      value={newUser.login}
                      onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
                      placeholder="username"
                      className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground mono placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1">Пароль <span className="text-risk-high">*</span></label>
                    <input
                      type="text"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="password123"
                      className="w-full bg-muted border border-border rounded-sm px-3 py-2 text-sm text-foreground mono placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveNew}
                    disabled={!newUser.login.trim() || !newUser.password.trim()}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    <Icon name="UserPlus" size={12} />
                    Создать
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-muted text-muted-foreground border border-border rounded-sm hover:text-foreground transition-colors"
                  >
                    <Icon name="X" size={12} />
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          )}
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
      </div>
    </div>
  );
}
