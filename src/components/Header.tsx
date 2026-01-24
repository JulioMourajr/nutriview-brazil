import { Activity, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-hero">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">SISVAN</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Vigilância Nutricional</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2" asChild>
            <a
              href="https://sisaps.saude.gov.br/sisvan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Portal SISVAN
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <a
              href="https://apidadosabertos.saude.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">API</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
