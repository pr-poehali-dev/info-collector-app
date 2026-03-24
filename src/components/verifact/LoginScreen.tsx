import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Credential } from "@/pages/Index";

interface LoginScreenProps {
  onLogin: (login: string, password: string) => boolean;
  credentials: Credential[];
}

export default function LoginScreen({ onLogin, credentials }: LoginScreenProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = onLogin(login.trim(), password);
      if (!success) {
        setIsLoading(false);
        setError("Неверный логин или пароль");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex flex-col items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className={`w-full max-w-sm relative animate-fade-in ${shake ? "animate-shake" : ""}`}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-sm flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Icon name="Shield" size={26} className="text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-widest text-foreground uppercase">ВериФакт</h1>
          <p className="text-xs text-muted-foreground mono mt-1 tracking-widest uppercase">Система верификации данных</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-sm p-6 shadow-xl shadow-black/20">
          <div className="mb-5">
            <div className="accent-line">
              <div className="text-sm font-medium text-foreground">Вход в систему</div>
              <div className="text-[10px] mono text-muted-foreground mt-0.5">Доступ только для авторизованных сотрудников</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Login */}
            <div>
              <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1.5">
                Логин
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Icon name="User" size={14} />
                </div>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => { setLogin(e.target.value); setError(""); }}
                  placeholder="Введите логин"
                  autoComplete="username"
                  className="w-full bg-muted border border-border rounded-sm pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] mono text-muted-foreground uppercase tracking-widest block mb-1.5">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Icon name="Lock" size={14} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  className="w-full bg-muted border border-border rounded-sm pl-9 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={14} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-risk-high bg-risk-high/10 border border-risk-high/20 rounded-sm px-3 py-2 animate-fade-in">
                <Icon name="AlertCircle" size={12} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-all mt-1"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  <span className="mono">Проверка доступа...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={14} />
                  Войти в систему
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo hint */}
        <div className="mt-4 bg-muted/40 border border-border rounded-sm p-3">
          <div className="text-[10px] mono text-muted-foreground uppercase tracking-widest mb-2">Демо-доступ</div>
          <div className="space-y-1">
            {credentials.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { setLogin(c.login); setPassword(c.password); setError(""); }}
                className="w-full flex items-center justify-between text-xs px-2 py-1.5 rounded-sm hover:bg-muted transition-colors text-left group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  <span className="mono text-foreground/70 group-hover:text-foreground transition-colors">{c.login} / {c.password}</span>
                </div>
                <span className="text-muted-foreground">{c.role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Icon name="Lock" size={10} />
            <span className="mono">TLS 1.3</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Icon name="ShieldCheck" size={10} />
            <span className="mono">AES-256</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-risk-low animate-pulse-dot inline-block" />
            <span className="mono">ОНЛАЙН</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.45s ease-in-out;
        }
      `}</style>
    </div>
  );
}