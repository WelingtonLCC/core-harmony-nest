import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Download } from "lucide-react";
import { useState } from "react";

interface VersionCheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VersionCheckDialog = ({ open, onOpenChange }: VersionCheckDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentVersion = "1.0.0";
  const latestVersion = "1.0.0"; // Simular versão atual = versão mais recente
  const needsUpdate = currentVersion !== latestVersion;

  const handleUpdate = () => {
    setIsUpdating(true);
    // Simulação de download/atualização
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          onOpenChange(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {needsUpdate ? (
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Download className="w-6 h-6 text-primary-foreground" />
              </div>
            )}
            <div>
              <DialogTitle>
                {needsUpdate ? "Atualização Disponível" : "Sistema Atualizado"}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription>
            {needsUpdate
              ? "Uma nova versão do sistema está disponível."
              : "Você está usando a versão mais recente do sistema."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Versão Atual:</span>
            <span className="font-semibold text-foreground">{currentVersion}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Versão Mais Recente:</span>
            <span className="font-semibold text-primary">{latestVersion}</span>
          </div>

          {needsUpdate && (
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Novidades na versão {latestVersion}:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Melhorias de performance</li>
                <li>Correções de bugs</li>
                <li>Novos recursos de segurança</li>
              </ul>
            </div>
          )}

          {isUpdating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Atualizando...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </div>

        <DialogFooter>
          {needsUpdate ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
                Mais Tarde
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isUpdating ? "Atualizando..." : "Atualizar Agora"}
              </Button>
            </>
          ) : (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Fechar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
