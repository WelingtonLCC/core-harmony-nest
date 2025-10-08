import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile?: any;
}

const availablePermissions = [
  "Gerenciar usuários",
  "Gerenciar perfis",
  "Visualizar relatórios",
  "Criar relatórios",
  "Configurações do sistema",
  "Aprovar solicitações",
  "Moderar conteúdo",
  "Visualizar dados",
  "Criar solicitações",
  "Exportar dados",
];

export const ProfileDialog = ({ open, onOpenChange, profile }: ProfileDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        description: profile.description,
        permissions: profile.permissions,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: [],
      });
    }
  }, [profile]);

  const handlePermissionToggle = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você conectaria com sua API Nest.js
    toast({
      title: profile ? "Perfil atualizado!" : "Perfil criado!",
      description: `${formData.name} foi ${profile ? "atualizado" : "criado"} com sucesso.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{profile ? "Editar Perfil" : "Novo Perfil"}</DialogTitle>
          <DialogDescription>
            {profile
              ? "Atualize as informações e permissões do perfil"
              : "Defina um novo perfil e suas permissões"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Perfil</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Administrador"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o que este perfil pode fazer..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Permissões</Label>
            <div className="rounded-lg border p-4 space-y-3 max-h-60 overflow-y-auto">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={() => handlePermissionToggle(permission)}
                  />
                  <label
                    htmlFor={permission}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.permissions.length} permissão(ões) selecionada(s)
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              {profile ? "Salvar Alterações" : "Criar Perfil"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
