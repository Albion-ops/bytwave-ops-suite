import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Monitor, FolderKanban, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';

const Dashboard = () => {
  const [stats, setStats] = useState({
    openTickets: 0,
    activeDevices: 0,
    activeProjects: 0,
    criticalIssues: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const [tickets, devices, projects] = await Promise.all([
        supabase.from('tickets').select('status, priority', { count: 'exact' }),
        supabase.from('devices').select('status', { count: 'exact' }),
        supabase.from('projects').select('status', { count: 'exact' }),
      ]);

      setStats({
        openTickets: tickets.data?.filter(t => t.status === 'open').length || 0,
        activeDevices: devices.data?.filter(d => d.status === 'in_use').length || 0,
        activeProjects: projects.data?.filter(p => p.status === 'in_progress').length || 0,
        criticalIssues: tickets.data?.filter(t => t.priority === 'urgent').length || 0,
      });
    };

    fetchStats();
  }, [user]);

  const statCards = [
    {
      title: 'Open Tickets',
      value: stats.openTickets,
      icon: Ticket,
      color: 'text-primary',
    },
    {
      title: 'Active Devices',
      value: stats.activeDevices,
      icon: Monitor,
      color: 'text-success',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: FolderKanban,
      color: 'text-accent',
    },
    {
      title: 'Critical Issues',
      value: stats.criticalIssues,
      icon: AlertCircle,
      color: 'text-destructive',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your system.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                No recent activity to display. Start by creating tickets, adding devices, or managing projects.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Navigate to different sections to manage your system:
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Create and manage support tickets</li>
                <li>• Track device inventory</li>
                <li>• Monitor project progress</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
