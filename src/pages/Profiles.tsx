import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, Plus, Edit, Trash2, Users } from "lucide-react";
import { ProfileDialog } from "@/components/ProfileDialog";

const Profiles = () => {
  const navigate = useNavigate();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const profiles = [
    {
      id: 1,
      name: "Administrador",
      description: "Acesso total ao sistema",
      permissions: ["Gerenciar usuários", "Gerenciar perfis", "Visualizar relatórios", "Configurações"],
      usersCount: 2,
      color: "bg-red-600",
    },
    {
      id: 2,
      name: "Gerente",
      description: "Acesso gerencial e relatórios",
      permissions: ["Visualizar relatórios", "Gerenciar usuários", "Aprovar solicitações"],
      usersCount: 5,
      color: "bg-blue-600",
    },
    {
      id: 3,
      name: "Usuário",
      description: "Acesso básico ao sistema",
      permissions: ["Visualizar dados", "Criar solicitações"],
      usersCount: 28,
      color: "bg-green-600",
    },
    {
      id: 4,
      name: "Moderador",
      description: "Gerenciamento de conteúdo",
      permissions: ["Moderar conteúdo", "Visualizar relatórios"],
      usersCount: 3,
      color: "bg-purple-600",
    },
  ];

  const handleEditProfile = (profile: any) => {
    setSelectedProfile(profile);
    setShowProfileDialog(true);
  };

  const handleNewProfile = () => {
    setSelectedProfile(null);
    setShowProfileDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Perfis e Permissões</h1>
              <p className="text-xs text-muted-foreground">Gerencie perfis de acesso</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Perfis do Sistema</h2>
            <p className="text-muted-foreground">Configure perfis e suas permissões</p>
          </div>
          <Button onClick={handleNewProfile} className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Perfil
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="shadow-elegant hover:shadow-glow transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${profile.color}`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{profile.name}</CardTitle>
                      <CardDescription>{profile.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditProfile(profile)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Permissões:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                    <Users className="w-4 h-4" />
                    <span>{profile.usersCount} usuários com este perfil</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <ProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        profile={selectedProfile}
      />
    </div>
  );
};

export default Profiles;
