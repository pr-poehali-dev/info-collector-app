import Icon from "@/components/ui/icon";

interface AppHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function AppHeader({ sidebarOpen, onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
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
  );
}
