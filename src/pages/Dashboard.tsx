import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import {
  LogOut,
  Users,
  Shield,
  Settings,
  BarChart3,
  Activity,
  AlertCircle,
} from "lucide-react";
import { VersionCheckDialog } from "@/components/VersionCheckDialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "usuario@email.com";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  const stats = [
    { title: "Usuários Ativos", value: "1,234", icon: Users, trend: "+12%" },
    { title: "Perfis Cadastrados", value: "48", icon: Shield, trend: "+3%" },
    { title: "Acessos Hoje", value: "892", icon: Activity, trend: "+8%" },
    { title: "Alertas", value: "3", icon: AlertCircle, trend: "-25%" },
  ];

  const quickActions = [
    {
      title: "Gerenciar Usuários",
      description: "Criar, editar e remover usuários do sistema",
      icon: Users,
      action: () => navigate("/usuarios"),
    },
    {
      title: "Perfis e Permissões",
      description: "Configurar perfis de acesso e permissões",
      icon: Shield,
      action: () => navigate("/perfis"),
    },
    {
      title: "Relatórios",
      description: "Visualizar relatórios e análises do sistema",
      icon: BarChart3,
      action: () => toast({ title: "Em desenvolvimento" }),
    },
    {
      title: "Configurações",
      description: "Ajustes gerais do sistema",
      icon: Settings,
      action: () => toast({ title: "Em desenvolvimento" }),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sistema DDD</h1>
              <p className="text-xs text-muted-foreground">Dashboard Administrativo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVersionDialog(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              v1.0.0
            </Button>
            <Avatar className="cursor-pointer hover:ring-2 ring-primary transition-smooth">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {userEmail[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-elegant hover:shadow-glow transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary font-medium">{stat.trend}</span> vs mês
                    anterior
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="shadow-elegant hover:shadow-glow transition-smooth cursor-pointer group"
                  onClick={action.action}
                >
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-2 group-hover:scale-110 transition-smooth">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Admin", action: "criou novo usuário", time: "há 5 minutos" },
                { user: "João Silva", action: "atualizou perfil", time: "há 15 minutos" },
                { user: "Maria Santos", action: "fez login", time: "há 30 minutos" },
                { user: "Admin", action: "modificou permissões", time: "há 1 hora" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-muted">
                        {activity.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <VersionCheckDialog open={showVersionDialog} onOpenChange={setShowVersionDialog} />
    </div>
  );
};

export default Dashboard;
