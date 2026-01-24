import { Heart, Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">SISVAN Dashboard</p>
              <p className="text-xs text-muted-foreground">
                Dados abertos do Sistema de Vigilância Alimentar e Nutricional
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://sisaps.saude.gov.br/sisvan/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Portal SISVAN
            </a>
            <a
              href="https://apidadosabertos.saude.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              API SUS
            </a>
            <a
              href="https://www.gov.br/saude/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Ministério da Saúde
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Feito com <Heart className="w-4 h-4 text-risk inline" /> para a saúde pública brasileira
          </p>
        </div>
      </div>
    </footer>
  );
}
